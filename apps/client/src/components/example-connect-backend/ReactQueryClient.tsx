'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getUsers } from '@/services/user';

interface ReactQueryClientProps {
  users: any;
}

function ReactQueryClient({ users }: ReactQueryClientProps) {
  const { data } = useQuery({
    queryKey: ['users'],
    queryFn: () => getUsers(),
    initialData: users,
  });

  return <div>ReactQueryClient</div>;
}

export default ReactQueryClient;
