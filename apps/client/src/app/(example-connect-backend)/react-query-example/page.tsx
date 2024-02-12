import React from 'react';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { getUsers } from '@/services/user';
import ReactQueryClient from '@/components/example-connect-backend/ReactQueryClient';

const fetchUsers = async () => {
  return getUsers();
};

async function ReactQuery() {
  const { data, response } = await fetchUsers();
  return <ReactQueryClient users={data} />;
}

export default ReactQuery;
