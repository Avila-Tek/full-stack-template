'use client';

import React from 'react';
import { gql } from '@apollo/client';
import {
  useQuery,
  useSuspenseQuery,
} from '@apollo/experimental-nextjs-app-support/ssr';
import { useLog } from '@avila-tek/ui/src/utils/log';

export default function UserList() {
  useLog({
    message: 'Hello from UserList',
    source: 'UserList.tsx',
    userEmail: 'info@avilatek.dev',
    userId: 'exampleUserId',
  });
  const { data } = useQuery(gql`
    query GET_USERS {
      users {
        _id
      }
    }
  `);
  return (
    <div>
      <ul>
        {data?.users?.map((user: any) => (
          <li key={user._id}>{user._id}</li>
        ))}
      </ul>
    </div>
  );
}
