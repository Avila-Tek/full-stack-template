'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';

function ReactQuery() {
  const [count, setCount] = React.useState(0);

  const { data } = useQuery({
    queryKey: ['hydrate-users'],
    queryFn: () => getUsers(),
  });

  return <div>ReactQuery</div>;
}

export default ReactQuery;
