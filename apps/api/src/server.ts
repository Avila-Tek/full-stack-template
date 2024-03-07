import Fastify from 'fastify';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import rateLimit from '@fastify/rate-limit';
import xhr2 from 'xhr2';
import sentryPlugin from '@immobiliarelabs/fastify-sentry';
import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginLandingPageDisabled } from '@apollo/server/plugin/disabled';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import {
  fastifyApolloDrainPlugin,
  fastifyApolloHandler,
} from '@as-integrations/fastify';
import { ProfilingIntegration } from '@sentry/profiling-node';
import { Integrations } from '@sentry/node';
import { schema } from './graphql/schema';
// import { userRoutes } from '@/components/users/user.routes';
import mongoose from 'mongoose';

global.XMLHttpRequest = xhr2;

export async function createServer() {
  let connection: typeof mongoose | null = null;
  try {
    connection = await mongoose
      .connect(String(process.env.DATABASE))
      .then((conn) => {
        console.log('Connected to database');
        return conn;
      });

    mongoose.connection.on('error', (err) => `❌🤬❌🤬 ${err}`);
  } catch (err) {
    console.log(`ERROR: ${err}`);
    if (connection && connection.connection) {
      connection.connection.close();
    }
    process.exit(1);
  }

  const server = Fastify({
    logger: {
      level: 'trace',
    },
  });

  const apollo = new ApolloServer<any>({
    schema,
    plugins: [
      process.env.NODE_ENV === 'production'
        ? ApolloServerPluginLandingPageDisabled()
        : ApolloServerPluginLandingPageLocalDefault({ footer: false }),
      fastifyApolloDrainPlugin(server),
    ],
  });

  await apollo.start();

  await server.register(rateLimit);
  if (process.env.NODE_ENV === 'production') {
    await server.register(helmet);
  }
  // await server.register(cors);

  if (process.env.NODE_ENV === 'production') {
    await server.register(sentryPlugin, {
      dsn: process.env.SENTRY_DSN,
      environment: 'production',
      release: process.env.VERSION,
      integrations: [
        new ProfilingIntegration(),
        new Integrations.Apollo(),
        new Integrations.Mongo({ useMongoose: true }),
      ],
    });
  }

  // routes
  // await server.register(userRoutes, { prefix: '/api' });

  await server.register(cors, {
    origin: JSON.parse(process.env.CORS_ORIGINS ?? '["*"]'),
    credentials: true,
  });

  // routes
  server.route({
    url: '/graphql',
    method: ['GET', 'POST', 'OPTIONS'],
    handler: fastifyApolloHandler(apollo, {
      context: async (request, reply) => ({ req: request, res: reply }),
    }),
  });
  await server.ready();
  return server;
}
