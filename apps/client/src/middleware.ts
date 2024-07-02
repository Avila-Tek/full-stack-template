import { Logger } from 'next-axiom';
import { NextResponse } from 'next/server';
import type { NextFetchEvent, NextRequest } from 'next/server';

export async function middleware(request: NextRequest, event: NextFetchEvent) {
  // ! Note: Should consider remove this loggers because spend storage
  const logger = new Logger({
    source: 'client.middleware',
    args: {
      msg: 'Message from middleware',
    },
  }); // traffic, request
  logger.middleware(request);

  event.waitUntil(logger.flush());
  return NextResponse.next();
}
// For more information, see Matching Paths below
export const config = {};
