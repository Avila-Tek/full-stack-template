/* eslint-disable no-continue */
/* eslint-disable class-methods-use-this */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-restricted-syntax */
import * as Sentry from '@sentry/node';
import * as Tracing from '@sentry/tracing';
import { ApolloError } from 'apollo-server';
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
        // If we couldn't parse the operation, don't
        // do anything here
        if (!ctx.operation) {
          return;
        }
        for (const err of ctx.errors) {
          // Only report internal server errors,
          // all errors extending ApolloError should be user-facing
          if (err instanceof ApolloError) {
            continue;
          }
          // Add scoped report details and send to Sentry
          Sentry.withScope((scope) => {
            // Annotate whether failing operation was query/mutation/subscription
            scope.setTag('kind', ctx.operation.operation);
            // Log query and variables as extras (make sure to strip out sensitive data!)
            scope.setExtra('query', ctx.request.query);
            scope.setExtra('variables', ctx.request.variables);
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
      },
    };
  }
}
