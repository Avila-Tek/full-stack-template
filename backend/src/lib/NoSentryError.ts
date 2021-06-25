import { ApolloError } from 'apollo-server-errors';

export class NoSentryError extends ApolloError {
  constructor(message: string) {
    super(message, 'NO_SENTRY');

    Object.defineProperty(this, 'name', { value: 'NoSentryError' });
  }
}
