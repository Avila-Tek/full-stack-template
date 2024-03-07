import React from 'react';
import { GET_USER } from '@/graphql/queries';
import { queryGraphql } from '@/lib/server-query';
import GraphqlClientExample from '@/components/example-connect-backend/GraphqlClientExample';

async function Graphql() {
  const data = await queryGraphql({
    query: GET_USER,
  });

  console.log(data);

  return (
    <div>
      <GraphqlClientExample />
    </div>
  );
}

export default Graphql;
