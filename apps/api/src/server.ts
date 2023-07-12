import Fastify from 'fastify';
import mongoose from 'mongoose';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import rateLimit from '@fastify/rate-limit';
import { ApolloServer, BaseContext } from '@apollo/server';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { ApolloServerPluginLandingPageDisabled } from '@apollo/server/plugin/disabled';
import {
  fastifyApolloDrainPlugin,
  fastifyApolloHandler,
} from '@as-integrations/fastify';
import { schema } from '@/graphql/Schema';
import config from '@/plugins/config';
// import routes from './routes/index.js';

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
  ajv: {
    customOptions: {
      removeAdditional: 'all',
      coerceTypes: true,
      useDefaults: true,
    },
  },
  logger: {
    level: process.env.LOG_LEVEL,
  },
});

const apollo = new ApolloServer<BaseContext>({
  schema,
  plugins: [
    process.env.NODE_ENV === 'production'
      ? ApolloServerPluginLandingPageDisabled()
      : ApolloServerPluginLandingPageLocalDefault({ footer: false }),
    fastifyApolloDrainPlugin(server),
  ],
});

await apollo.start();

await server.register(config);
await server.register(rateLimit);
if (process.env.NODE_ENV === 'production') {
  await server.register(helmet);
}
await server.register(cors);

// routes
server.route({
  url: '/graphql',
  method: ['GET', 'POST', 'OPTIONS'],
  handler: fastifyApolloHandler(apollo),
});
// await server.register(routes);
await server.ready();

export default server;
