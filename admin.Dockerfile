FROM node:18-alpine AS base
RUN apk add --no-cache git libc6-compat tzdata
ENV TZ=America/Caracas
ENV SCOPE=admin
WORKDIR /app
COPY . .

FROM base AS deps
COPY ./package*.json .
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
ENV TZ=America/Caracas
ARG NEXT_PUBLIC_SENTRY_DSN
ARG RELEASE
ARG SENTRY_URL
ARG SENTRY_ORG
ARG SENTRY_PROJECT
ARG SENTRY_TOKEN
COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN npm i -g @sentry/cli
WORKDIR /app/apps/admin
RUN npx @sentry/wizard -i nextjs --quiet --skip-connect
RUN echo "defaults.org=$SENTRY_ORG" >> ./sentry.properties
RUN echo "defaults.project=$SENTRY_PROJECT" >> ./sentry.properties
RUN echo "auth.token=$SENTRY_TOKEN" >> ./sentry.properties
RUN rm -f ./pages/_error.js ./next.config.wizardcopy.js ./sentry.client.config.wizardcopy.js ./sentry.server.config.wizardcopy.js
WORKDIR /app
ENV NODE_OPTIONS="--max-old-space-size=4096"
RUN ./node_modules/.bin/turbo run build --scope=${SCOPE} --filter=${SCOPE} --include-dependencies --no-deps

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV TZ=America/Caracas

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

COPY --from=builder /app/package*.json .
COPY --from=builder /app/apps/admin/next.config.js /app/apps/admin/next.config.js
COPY --from=builder /app/packages/ui /app/packages/ui
COPY --from=builder /app/apps/admin/public /app/apps/admin/public
COPY --from=builder --chown=nextjs:nodejs /app/apps/admin/.next /app/apps/admin/.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/apps/admin/package.json /app/apps/admin/package.json
COPY --from=builder /app/apps/admin/.env.local /app/apps/admin/.env.local

USER nextjs

EXPOSE 3002

WORKDIR /app/apps/admin

CMD ["npm", "start"]
