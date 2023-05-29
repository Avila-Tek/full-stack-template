'use client';

import React from 'react';
import { gql } from '@apollo/client';
import {
  useQuery,
  useSuspenseQuery,
} from '@apollo/experimental-nextjs-app-support/ssr';

export default function UserList() {
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
