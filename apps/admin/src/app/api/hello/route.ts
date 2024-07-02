export async function GET(request: Request) {
  return new Response('Hello, Next.js!');
}

// import { withAxiom, AxiomRequest } from 'next-axiom';
// import { NextResponse } from 'next/server';

// export const GET = withAxiom((req: AxiomRequest) => {
//   req.log.info('Hello function called');

//   // You can create intermediate loggers
//   const log = req.log.with({ scope: 'user' });
//   log.info('User logged in', { userId: 42 });

//   return new NextResponse('Hello, Next.js!');
// });
