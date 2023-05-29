import { gql } from '@apollo/client';
import { Inter } from 'next/font/google';
import { getClient } from '../lib/apollo-client';
import UserList from '../components/UserList';

const inter = Inter({ subsets: ['latin'] });

export const dynamic = 'force-dynamic';

async function getData() {
  const { data } = await getClient().query({
    query: gql`
      query GET_USERS {
        users {
          _id
        }
      }
    `,
  });
  return data;
}

export default async function Home() {
  const data = await getData();
  return (
    <main className={inter.className}>
      <h1 className="">Home page</h1>
      <ul>
        {data?.users?.map((user: any) => (
          <li key={user._id}>{user._id}</li>
        ))}
      </ul>
      <hr />
      <UserList />
    </main>
  );
}
