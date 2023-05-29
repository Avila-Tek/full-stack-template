FROM node:18-alpine AS builder
RUN apk add --no-cache git libc6-compat tzdata g++ make py3-pip
RUN apk update
ENV TZ=America/Caracas
ENV SCOPE=api
WORKDIR /app
RUN npm i -g turbo
COPY . .
RUN turbo prune --scope=${SCOPE} --docker


FROM node:18-alpine AS installer
RUN apk add --no-cache git libc6-compat tzdata g++ make py3-pip
RUN apk update
ENV TZ=America/Caracas
ENV SCOPE=api
WORKDIR /app
RUN npm i -g turbo

# First install dependencies (as they change less often)
COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/package-lock.json ./package-lock.json
RUN npm i turbo
RUN npm install

# Build the project and its dependencies
COPY --from=builder /app/out/full/ .
COPY turbo.json turbo.json

ARG TURBO_TEAM
ARG TURBO_TOKEN
ARG RELEASE
ARG SENTRY_ORG
ARG SENTRY_PROJECT
ARG SENTRY_TOKEN

ENV TURBO_TEAM=$TURBO_TEAM
ENV TURBO_TOKEN=$TURBO_TOKEN
ENV RELEASE=$RELEASE
ENV SENTRY_ORG=$SENTRY_ORG
ENV SENTRY_PROJECT=$SENTRY_PROJECT
ENV SENTRY_AUTH_TOKEN=$SENTRY_TOKEN

RUN npm i -g @sentry/cli turbo
ENV SCOPE=api
RUN turbo run build --filter=${SCOPE}
RUN sentry-cli releases new ${RELEASE}
RUN sentry-cli releases files ${RELEASE} upload-sourcemaps ./dist
RUN sentry-cli releases finalize ${RELEASE}


FROM node:18-alpine AS runner
ENV NODE_ENV production
RUN apk add --no-cache tzdata
RUN apk update
ENV TZ=America/Caracas
WORKDIR /app

RUN addgroup --system --gid 1001 expressjs
RUN adduser --system --uid 1001 expressjs
USER expressjs

COPY --from=installer /app/package*.json .
COPY --from=installer /app/apps/api/dist ./apps/api/dist
COPY --from=installer /app/apps/api/src/variables.env ./apps/api/src/variables.env
COPY --from=installer /app/node_modules ./node_modules
COPY --from=installer /app/apps/api/package.json ./apps/api/package.json

EXPOSE 3000

WORKDIR /app/apps/api

CMD ["npm", "start"]
