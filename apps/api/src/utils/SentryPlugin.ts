/* eslint-disable no-restricted-syntax */
/* eslint-disable class-methods-use-this */
import * as Sentry from '@sentry/node';
import jwt from 'jsonwebtoken';
import type { Request, Response } from 'express';
import {
  ApolloServerPlugin,
  GraphQLRequestContext,
  GraphQLRequestContextDidEncounterErrors,
  GraphQLRequestListener,
} from '@apollo/server';

interface IContext {
  req: Request;
  res: Response;
}

export class SentryPlugin implements ApolloServerPlugin {
  requestDidStart(
    _requestContext: GraphQLRequestContext<IContext>
  ): Promise<GraphQLRequestListener<IContext> | void> {
    return Promise.resolve({
      async didEncounterErrors(
        ctx: GraphQLRequestContextDidEncounterErrors<any>
      ): Promise<void> {
        if ((ctx as any)?.req?.cookies?.token) {
          const payload = jwt.decode(
            (ctx as any)?.req?.cookies?.token as string
          );
          Sentry.setUser({
            id: (payload as any).id,
          });
        }
        for (const err of ctx.errors) {
          // Only report internal server errors,
          // all errors extending ApolloError should be user-facing
          if (err?.extensions?.code !== 'NO_SENTRY') {
            // Add scoped report details and send to Sentry
            Sentry.withScope((scope) => {
              // Annotate whether failing operation was query/mutation/subscription
              scope.setTag('kind', ctx?.operation?.operation);
              // Log query and variables as extras (make sure to strip out sensitive data!)
              scope.setExtra('query', ctx?.request?.query);
              scope.setExtra('variables', ctx?.request?.variables);
              if (err.path) {
                // We can also add the path as breadcrumb
                scope.addBreadcrumb({
                  category: 'query-path',
                  message: err.path.join(' > '),
                  level: 'debug',
                });
              }
              Sentry.captureException(err);
            });
          }
        }
      },
    });
  }
}
