import React from 'react';
import { getUsers } from '@/services/user/queries';
import ReactQueryClientExample from '@/components/example-connect-backend/ReactQueryClientExample';

const fetchUsers = async () => {
  return getUsers();
};

async function ReactQuery() {
  const { data, response } = await fetchUsers();
  return <ReactQueryClientExample users={data} />;
}

export default ReactQuery;
