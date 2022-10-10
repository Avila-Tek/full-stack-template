FROM node:16-alpine AS base
RUN apk add --no-cache git libc6-compat
WORKDIR /app
ENV SCOPE=api
COPY . .

FROM base AS deps
COPY package.json package-lock.json ./
RUN npm ci

FROM base AS builder
COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN ./node_modules/.bin/turbo run build --scope=${SCOPE} --filter=${SCOPE} --include-dependencies --no-deps

FROM node:16-alpine AS runner
WORKDIR /app
ENV NODE_ENV production
COPY --from=builder /app/package*.json .
COPY --from=builder /app/apps/api/dist /app/apps/api/dist
COPY --from=builder /app/apps/api/src/variables.env /app/apps/api/src/variables.env
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/apps/api/package.json /app/apps/api/package.json

EXPOSE 3000

WORKDIR /app/apps/api

CMD ["npm", "start"]
