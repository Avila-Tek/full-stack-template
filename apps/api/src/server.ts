/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable import/newline-after-import */
/* eslint-disable import/first */
import dotenv from 'dotenv';
dotenv.config({ path: './src/variables.env' });
import * as Sentry from '@sentry/node';
import * as Tracing from '@sentry/tracing';
import mongoose from 'mongoose';
import { RewriteFrames } from '@sentry/integrations';
import { ApolloServer } from 'apollo-server-express';
import {
  ApolloServerPluginLandingPageGraphQLPlayground,
  ApolloServerPluginLandingPageDisabled,
} from 'apollo-server-core';
import { SentryPlugin } from './utils';
import app from './app';
import schema from './graphql/schema';

declare global {
  namespace NodeJS {
    interface Global {
      __rootdir__: string;
    }
  }
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
global.__rootdir__ = process.cwd() || __dirname;

async function initSever() {
  let connection: typeof mongoose | null = null;
  try {
    connection = await mongoose
      .connect(String(process.env.DATABASE))
      .then((conn) => {
        console.log('Connected to database');
        return conn;
      });

    mongoose.connection.on('error', (err) => `❌🤬❌🤬 ${err}`);

    const PORT = Number(process.env.PORT);

    const server: ApolloServer = new ApolloServer({
      schema,
      introspection: true,
      plugins: [
        process.env.NODE_ENV === 'production'
          ? ApolloServerPluginLandingPageDisabled()
          : ApolloServerPluginLandingPageGraphQLPlayground(),
        new SentryPlugin(),
      ],
      context: ({ req, res }) => ({
        req,
        res,
      }),
    });

    await server.start();

    server.applyMiddleware({
      app,
      cors: {
        credentials: true,
        origin: JSON.parse(process.env?.CORS_ORIGINS ?? '[]'),
      },
    });

    if (process.env.NODE_ENV !== 'development') {
      Sentry.init({
        dsn: process.env.SENTRY_DSN,
        tracesSampleRate: 0.5,
        integrations: [
          new RewriteFrames({
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            root: global.__rootdir__,
          }),
          new Sentry.Integrations.Http({ tracing: true }),
          new Tracing.Integrations.Mongo({ useMongoose: true }),
          new Tracing.Integrations.Apollo(),
        ],
      });
    }

    await new Promise((resolve: unknown) => {
      app.listen({ port: PORT }, () =>
        console.log(
          `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
        )
      );
      if (typeof resolve === 'function') {
        resolve();
      }
    });
  } catch (err) {
    if (connection) {
      connection.connection.close();
    }
    console.log(err);
    process.exit(1);
  }
}

initSever();
