import React from 'react';
import { GET_USER } from '@/graphql/queries';
import { queryGraphql } from '@/lib/server-query';
import GraphqlClient from '@/components/example-connect-backend/GraphqlClientExample';

async function Graphql() {
  const data = await queryGraphql<{
    user: {
      email: string;
    };
  }>({
    query: GET_USER,
  });

  return (
    <div>
      <h1>GraphQL example</h1>
      <span>
        Data from server: <pre>{JSON.stringify(data, null, 2)}</pre>
      </span>
      <GraphqlClient />
    </div>
  );
}

export default Graphql;
