import React from 'react';
import { GET_USER } from '@/graphql/queries';
import { queryGraphql } from '@/lib/server-query';
import GraphqlClient from '@/components/example-connect-backend/GraphqlClient';

async function Graphql() {
  const { data } = await queryGraphql({
    query: GET_USER,
  });

  return (
    <div>
      <GraphqlClient />
    </div>
  );
}

export default Graphql;
