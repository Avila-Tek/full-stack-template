/* eslint-disable import/newline-after-import */
/* eslint-disable import/first */
import dotenv from 'dotenv';
dotenv.config({ path: './src/variables.env' });
import mongoose from 'mongoose';
import * as Sentry from '@sentry/node';
import { ApolloServer } from 'apollo-server-express';
import { SentryPlugin } from './plugins/sentry';
import app from './app';
import schema from './graphql/schema';

mongoose.Promise = global.Promise;

mongoose
  .connect(String(process.env.DATABASE), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log(`🤩🍃 MongoDB is Running`);
  })
  .catch((err) => {
    console.log(`❌🤬 ${err}`);
    process.exit();
  });

mongoose.connection.on('error', (err) => `❌🤬❌🤬 ${err}`);

const PORT = Number(process.env.PORT);

const server: ApolloServer = new ApolloServer({
  schema,
  introspection: true,
  tracing: true,
  // plugins: [new SentryPlugin()],
  context: ({ req, res }) => {
    if ((req?.body?.operationName ?? '') !== 'IntrospectionQuery') {
      console.log(
        `GraphQL: ${req?.body?.operationName ?? '-'} ${
          req.headers['content-length']
        }`
      );
    }
    return {
      req,
      res,
    };
  },
});

server.applyMiddleware({
  app,
  cors: {
    credentials: true,
    origin: [
      process.env.CLIENT_URL,
      process.env.DASHBOARD_URL,
      process.env.CLIENT_URL_WWW,
      process.env.DASHBOARD_URL_WWW,
    ],
  },
});

if (process.env.NODE_ENV !== 'development') {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    tracesSampleRate: 0.5,
  });
}

app.listen({ port: PORT }, () =>
  console.log(
    `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
  )
);
