'use client';

import React from 'react';
import { useUsers } from '@/services/user/hooks';

interface ReactQueryClientProps {
  users: any; // FIXME: Replace with the correct type
}

function ReactQueryClientExample({ users }: ReactQueryClientProps) {
  // if you need the same query in client and server, you can use initialData
  const { data } = useUsers({
    initialData: users,
  });

  console.log('data in client', data);

  return <div>ReactQueryClient</div>;
}

export default ReactQueryClientExample;
