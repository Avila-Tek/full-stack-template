import { GraphQLError } from 'graphql';

export class NoSentryError extends GraphQLError {
  constructor(message: string) {
    super(message, {
      extensions: {
        code: 'NO_SENTRY',
        name: 'NoSentryError',
      },
    });
  }
}
