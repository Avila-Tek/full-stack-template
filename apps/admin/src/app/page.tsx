import { USER_PAGINATION } from '@/graphql/queries';
import { queryGraphql } from '@/lib/server-query';
import { Button, Header } from '@avila-tek/ui';

type TUser = {
  _id: string;
  name: string;
};

type TData = {
  userPagination: {
    items: Array<Partial<TUser>>;
  };
};

type TVariables = {
  perPage?: number;
  page?: number;
};

export default async function Page() {
  const data = await queryGraphql<TData, TVariables>({
    query: USER_PAGINATION,
    variables: {
      page: 1,
      perPage: 10,
    },
  });
  if (!Array.isArray(data?.userPagination?.items)) {
    return <div />;
  }
  return (
    <>
      <Header>Merchant Center</Header>

      <ul>
        {data.userPagination.items.map((user) => (
          <li key={user._id}>{user.name}</li>
        ))}
      </ul>
      <Button />
    </>
  );
}
