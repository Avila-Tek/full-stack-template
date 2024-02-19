import React from 'react';
import { GET_USER } from '@/graphql/queries';
import { queryGraphql } from '@/lib/server-query';
import GraphqlClient from '@/components/example-connect-backend/GraphqlClientExample';

async function Graphql() {
  const { data } = await queryGraphql({
    query: GET_USER,
  });

  return (
    <div>
      <GraphqlClient />
      {data?.users.map((user: any) => <div key={user.id}>{user.name}</div>)}
    </div>
  );
}

export default Graphql;