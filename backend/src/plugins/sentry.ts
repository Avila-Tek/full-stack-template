/* eslint-disable import/prefer-default-export */
/* eslint-disable class-methods-use-this */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-restricted-syntax */
import * as Sentry from '@sentry/node';
import jwt from 'jsonwebtoken';
import {
  ApolloServerPlugin,
  GraphQLRequestContext,
  GraphQLRequestListener,
} from 'apollo-server-plugin-base';

export class SentryPlugin implements ApolloServerPlugin {
  public requestDidStart(
    _requestContext: GraphQLRequestContext
  ): GraphQLRequestListener | void {
    return {
      didEncounterErrors(ctx) {
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
                  level: Sentry.Severity.Debug,
                });
              }
              Sentry.captureException(err);
            });
          }
        }
      },
    };
  }
}
