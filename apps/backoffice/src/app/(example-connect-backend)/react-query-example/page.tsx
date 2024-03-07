import React from 'react';
import { getUsers } from '@/services/user/queries';
import ReactQueryClientExample from '@/components/example-connect-backend/ReactQueryClientExample';

async function ReactQuery() {
  const data = await getUsers();

  console.log(data, 'data in server');

  return <ReactQueryClientExample users={data} />;
}

export default ReactQuery;
