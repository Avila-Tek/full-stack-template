import { Inter } from 'next/font/google';
import { serverLog } from '@avila-tek/ui/src/utils/log';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  serverLog({
    message: 'Hello Avila from HomePage',
    source: 'HomePage',
    userId: 'lesanpi',
  });

  return <main className={inter.className}>Home page</main>;
}
