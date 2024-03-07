import React from 'react';
import { GET_USER } from '@/graphql/queries';
import { queryGraphql } from '@/lib/server-query';
import GraphqlClientExample from '@/components/example-connect-backend/GraphqlClientExample';

/**  GraphQL query example in server component */
async function Graphql() {
  const data = await queryGraphql({
    query: GET_USER,
  });

  return (
    <div>
      <h1>GraphQL example</h1>
      <span>
        Data from server: <pre>{JSON.stringify(data, null, 2)}</pre>
      </span>
      <GraphqlClientExample />
    </div>
  );
}

export default Graphql;
