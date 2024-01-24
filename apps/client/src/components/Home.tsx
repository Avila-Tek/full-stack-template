'use client';

import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_USERS } from '../graphql/queries';

function Home() {
  const { loading, error, data } = useQuery(GET_USERS, {
    variables: {},
  });

  //   console.log(data);
  return <div>Home</div>;
}

export default Home;
