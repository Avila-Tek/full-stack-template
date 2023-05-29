/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable import/newline-after-import */
/* eslint-disable import/first */
import http from 'http';
import dotenv from 'dotenv';
dotenv.config({ path: './src/variables.env' });
import * as Sentry from '@sentry/node';
import * as Tracing from '@sentry/tracing';
import mongoose from 'mongoose';
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet';
import { RewriteFrames } from '@sentry/integrations';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { ApolloServerPluginLandingPageDisabled } from '@apollo/server/plugin/disabled';
import { ApolloServerPluginCacheControl } from '@apollo/server/plugin/cacheControl';
import { InMemoryLRUCache } from '@apollo/utils.keyvaluecache';
import { SentryPlugin } from './utils/SentryPlugin';
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

interface IContext {
  req: express.Request;
  res: express.Response;
}

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

    const app = express();

    const PORT = Number(process.env.PORT);

    app.set('port', PORT || 3000);
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(cookieParser());
    if (process.env.NODE_ENV === 'production') {
      app.use(
        helmet({
          contentSecurityPolicy:
            process.env.NODE_ENV === 'production' ? undefined : false,
        })
      );
    }
    app.use(Sentry.Handlers.requestHandler());
    app.use(Sentry.Handlers.tracingHandler());
    app.use(Sentry.Handlers.errorHandler());

    const httpServer = http.createServer(app);

    const server = new ApolloServer<IContext>({
      schema,
      introspection: true,
      cache: new InMemoryLRUCache({
        maxSize: 100 * 1024 * 1024,
        ttl: 60 * 60 * 8,
      }),
      plugins: [
        process.env.NODE_ENV === 'production'
          ? ApolloServerPluginLandingPageDisabled()
          : ApolloServerPluginLandingPageLocalDefault({ footer: false }),
        ApolloServerPluginDrainHttpServer({ httpServer }),
        ApolloServerPluginCacheControl({
          defaultMaxAge: 60,
          calculateHttpHeaders: true,
        }),
        new SentryPlugin(),
      ],
    });

    await server.start();

    app.use(
      '/graphql',
      cors<cors.CorsRequest>({
        origin: JSON.parse(process?.env?.CORS_ORIGINS ?? '[]'),
        credentials: true,
      }),
      expressMiddleware(server, {
        context: async ({ req, res }) => ({ req, res }),
      })
    );

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
          new Tracing.Integrations.Express({ app }),
          new Tracing.Integrations.Apollo(),
        ],
      });
    }

    await new Promise<void>((resolve) => {
      httpServer.listen({ port: PORT }, resolve);
    });
    console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
  } catch (err) {
    if (connection) {
      connection.connection.close();
    }
    console.log(err);
    process.exit(1);
  }
}

initSever();
