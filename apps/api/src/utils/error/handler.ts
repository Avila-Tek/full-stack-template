import type { FastifyRequest, FastifyReply } from 'fastify';
import { errorTitleDictionary } from './dictionary';

export interface StandardError {
  type: String;
  title: String;
  status: Number;
  detail: String;
  instance?: String;
}

export function handleError(
  error: Error,
  request: FastifyRequest,
  reply: FastifyReply
) {
  const status = Number(error.message?.split('-')?.[0] ?? 500);

  const type = error.message?.split('-')?.[1] ?? 'default';

  const standardError: StandardError = {
    type,
    title:
      errorTitleDictionary?.[status]?.[type]?.[
        request?.headers['accept-language'] ?? 'en'
      ] ?? 'Unhandled server error',
    status,
    detail: `${error.stack ?? error.cause ?? error.message}`,
  };
  // Log error
  console.log(standardError);
  // Send error response
  reply.status(status).send(standardError);
}
