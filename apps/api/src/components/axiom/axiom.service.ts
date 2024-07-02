import { Axiom } from '@axiomhq/js';
import { TCreateLog } from './axiom.dto';

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
 * Asynchronously logs a message to Axiom.
 *
 * This function takes a `TCreateLog` object containing the message details and sends it to Axiom using the `axiom` library.
 * It expects the `AXIOM_TOKEN` and `AXIOM_ORG_ID` environment variables to be set with your Axiom credentials.
 *
 * @param {TCreateLog} args - An object containing the log message details.
 * @example
 * ```javascript
 * const logEntry = {
 *   message: 'An error occurred',
 *   source: 'MyService',
 *   userId: '12345',
 *   userEmail: 'user@example.com',
 * };
 *
 * log(logEntry)
 * ```
 */
export async function log(args: TCreateLog) {
  try {
    const axiom = new Axiom({
      token: process.env.AXIOM_TOKEN,
      orgId: process.env.AXIOM_ORG_ID,
    });
    axiom.ingest(process.env.AXIOM_DATASET, [
      {
        ...args,
        stack: args.error == null ? null : generateCleanStackTrace(args.error),
      },
    ]);
  } catch (error) {
    console.error(error);
  }
}
