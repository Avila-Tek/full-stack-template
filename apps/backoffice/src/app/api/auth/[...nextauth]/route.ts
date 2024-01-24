import NextAuth from 'next-auth';
import { authOptions } from '@/lib/auth';

// export const dynamic = 'force-dynamic';
// export const fetchCache = 'force-no-store';

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
