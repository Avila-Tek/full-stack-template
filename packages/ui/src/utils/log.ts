import { useLogger, Logger } from 'next-axiom';

type CreateLogInput = {
  message: string;
  source: string;
  userId?: string;
  userEmail?: string;
  error?: Error;
};

function generateCleanStackTrace(error: Error): string[] {
  // Condense stack trace to an array of strings (more readable)
  let stack = error.stack?.split('\n').map((line) => line.trim()) || [];
  // Remove the first line of the stack trace (it's the error message, which we already declare in title)
  stack.shift();
  // Remove project path from stack trace (makes it more readable)
  const root = process.cwd();
  stack = stack.map((line) => {
    // Remove the "at" at the beginning of each line
    const stackLine = line.slice(3);
    // Compare case-insensitive but replace with original case
    const rootIndex = stackLine.toLowerCase().indexOf(root.toLowerCase());
    // If root path is not found, return original line
    if (rootIndex === -1) return stackLine;
    // Replace root path with empty string
    return (
      stackLine.slice(0, rootIndex) + stackLine.slice(rootIndex + root.length)
    );
  });
  return stack;
}

/**
 * Registers a message with optional user information from Client component
 *
 * This function utilizes the `useLogger` hook (assumed to be imported from an external library)
 * to register a message with a specified source. It also allows including optional user information
 * like user ID and email.
 *
 * @param {string} message - The message to be registered.
 * @param {string} source - The source of the message (required).
 * @param {string} [userId] - The user ID (optional).
 * @param {string} [userEmail] - The user email (optional).
 *
 * @example
 * ```typescript
 *  useLog({ message: 'User clicked a button', source: 'UserList', userId: '12345', userEmail: 'user@example.com' });
 * ```
 */
export function useLog(data: CreateLogInput) {
  const log = useLogger({
    source: data.source,
    args: {
      stack: data.error == null ? null : generateCleanStackTrace(data.error),
    },
  });

  if (!data.source) {
    console.error('El parámetro "source" es obligatorio');
    return;
  }
  log.info(data.message, {
    userId: data.userId,
    userEmail: data.userEmail,
  });
}

/**
 * Logs a message to the server with optional user information from Server component
 *
 * This function creates a new `Logger` instance with the provided `source` and uses it to log the `message`.
 * It also allows including optional user information like user ID and email within the log message.
 *
 * @param {string} message - The message to be logged.
 * @param {string} source - The source of the message (required).
 * @param {string} [userId] - The user ID (optional).
 * @param {string} [userEmail] - The user email (optional).
 *
 * @example
 * ```typescript
 * const logEntry: CreateLogInput = {
 *   message: 'An error occurred',
 *   source: 'MyService',
 *   userId: '12345',
 *   userEmail: 'user@example.com',
 * };
 *
 * serverLog(logEntry);
 * ```
 */
export function serverLog(data: CreateLogInput) {
  const log = new Logger({
    source: data.source,
    args: {
      userId: data.userId,
      userEmail: data.userEmail,
      stack: data.error == null ? null : generateCleanStackTrace(data.error),
    },
  }).with({ userId: data.userId, userEmail: data.userEmail });
  log.info(data.message, { userId: data.userId, userEmail: data.userEmail });
}
