import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_USERS } from '../../../components/user/graphql';
import { User } from '../../../models';
import Layout from '../../../components/Layout';
import UserTable from '../../../components/user/UserTable';

export default function Users() {
  const { data, error, loading } = useQuery<{
    users: Array<User>;
  }>(GET_USERS, {
    fetchPolicy: 'network-only',
  });
  return (
    <Layout title="Usuarios">
      <UserTable loading={loading} users={data?.users ?? []} error={error} />
    </Layout>
  );
}
