'use client';

import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_USER } from '@/graphql/queries';

function GraphqlClientExample() {
  // remember to use the correct type for the data
  const { loading, data, error } = useQuery<{
    user: {
      email: string;
    };
  }>(GET_USER, {
    fetchPolicy: 'network-only',
  });

  console.log(data, loading, error);

  return <div>Hello {data?.user?.email}</div>;
}

export default GraphqlClientExample;
