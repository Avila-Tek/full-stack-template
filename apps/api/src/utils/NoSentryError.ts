import { GraphQLError } from 'graphql';

export interface StandardError {
  type: String;
  title: String;
  status: Number;
  detail: String;
  instance?: String;
}

export class NoSentryError extends GraphQLError {
  constructor(message: string, standardError: StandardError) {
    super(message, {
      extensions: {
        code: 'NO_SENTRY',
        name: 'NoSentryError',
        ...standardError,
      },
    });
  }
}
