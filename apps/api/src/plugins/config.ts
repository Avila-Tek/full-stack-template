import 'dotenv/config';
import Ajv from 'ajv';
import fp from 'fastify-plugin';
import { Static, Type } from '@sinclair/typebox';
import type { FastifyInstance } from 'fastify';

export enum NodeEnv {
  development = 'development',
  test = 'test',
  production = 'production',
}

const ConfigSchema = Type.Strict(
  Type.Object({
    NODE_ENV: Type.Enum(NodeEnv),
    LOG_LEVEL: Type.String(),
    API_HOST: Type.String(),
    API_PORT: Type.String(),
    DATABASE: Type.String(),
    ALGOLIA_APP_ID: Type.String(),
    ALGOLIA_PUBLIC_KEY: Type.String(),
    ALGOLIA_PRIVATE_KEY: Type.String(),
    AWS_BUCKET_NAME: Type.String(),
    AWS_REGION: Type.String(),
    AWS_ACCESS_KEY_ID: Type.String(),
    AWS_SECRET_ACCESS_KEY: Type.String(),
    POSTMARK_API_KEY: Type.String(),
    SENDER_EMAIL: Type.String(),
  })
);

const ajv = new Ajv({
  allErrors: true,
  removeAdditional: true,
  useDefaults: true,
  coerceTypes: true,
  allowUnionTypes: true,
});

export type Config = Static<typeof ConfigSchema>;

async function configPlugin(server: FastifyInstance) {
  const validate = ajv.compile(ConfigSchema);
  const valid = validate(process.env);
  if (!valid) {
    throw new Error(
      '.env file validation failed - ' +
        JSON.stringify(validate.errors, null, 2)
    );
  }
  server.decorate('config', process.env as any);
}

declare module 'fastify' {
  // eslint-disable-next-line @typescript-eslint/no-shadow
  interface FastifyInstance {
    config: Config;
  }
}

export default fp(configPlugin);
