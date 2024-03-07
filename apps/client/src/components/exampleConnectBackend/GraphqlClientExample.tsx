'use client';

import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_USER } from '@/graphql/queries';

/**  GraphQL query example in client component */
function GraphqlClientExample() {
  const { loading, data, error } = useQuery<{
    user: {
      email: string;
    };
  }>(GET_USER, {
    fetchPolicy: 'network-only',
  });

  return (
    <div>
      <span>
        Data in client: <pre>{JSON.stringify(data, null, 2)}</pre>
      </span>
    </div>
  );
}

export default GraphqlClientExample;
