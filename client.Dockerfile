FROM node:16-alpine AS base
RUN apk add --no-cache git libc6-compat tzdata
ENV TZ=America/Caracas
ENV SCOPE=client
WORKDIR /app
COPY . .

FROM base AS deps
COPY ./package*.json .
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
ARG NEXT_PUBLIC_SENTRY_DSN
ARG SENTRY_URL
ARG SENTRY_ORG
ARG SENTRY_PROJECT
ARG SENTRY_TOKEN
COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN npm i -g @sentry/cli
WORKDIR /app/apps/client
RUN npx @sentry/wizard -i nextjs --quiet --skip-connect
RUN echo "defaults.org=$SENTRY_ORG" >> ./sentry.properties
RUN echo "defaults.project=$SENTRY_PROJECT" >> ./sentry.properties
RUN echo "auth.token=$SENTRY_TOKEN" >> ./sentry.properties
RUN rm -f ./pages/_error.js ./next.config.wizardcopy.js ./sentry.client.config.wizardcopy.js ./sentry.server.config.wizardcopy.js
WORKDIR /app
RUN NODE_OPTIONS="--max-old-space-size=2048" ./node_modules/.bin/turbo run build --scope=${SCOPE} --filter=${SCOPE} --include-dependencies --no-deps

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

COPY --from=builder /app/package*.json .
COPY --from=builder /app/apps/client/next.config.js /app/apps/client/next.config.js
COPY --from=builder /app/packages/ui /app/packages/ui
COPY --from=builder /app/apps/client/public /app/apps/client/public
COPY --from=builder --chown=nextjs:nodejs /app/apps/client/.next /app/apps/client/.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/apps/client/package.json /app/apps/client/package.json
COPY --from=builder /app/apps/client/.env.local /app/apps/client/.env.local

USER nextjs

EXPOSE 3001

WORKDIR /app/apps/client

CMD ["npm", "start"]
