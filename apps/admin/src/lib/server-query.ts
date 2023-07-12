import { ApolloError, type QueryOptions } from '@apollo/client';
import { getClient } from './apollo-client';

/**
 * @function queryGraphql<TData,TVariables>
 * @description A wrapper around the Apollo Client's `query` function.
 * @param {QueryOptions} opts
 * @returns {Promise<TData>}
 * @example
 * ```tsx
 * import { GET_USERS } from '@/graphql/queries';
 * import { queryGraphql } from '@/lib/server-query';
 * import { Button, Header } from '@avila-tek/ui';
 *
 * type TUser = {
 *  _id: string;
 *  name: string;
 * };
 *
 * type GET_USER_QUERY = {
 *  users: Array<TUser>
 * };
 *
 * export default async function Page() {
 *   const data = await queryGraphql<GET_USER_QUERY>({
 *     query: GET_USERS,
 *   });
 *   return (
 *     <>
 *       <Header>Storefront</Header>
 *       <Button />
 *     </>
 *   );
 * }
 * ```
 */
export async function queryGraphql<TData = any, TVariables = any>({
  ...opts
}: QueryOptions<TVariables, TData>) {
  const { data, error, errors } = await getClient().query({
    ...opts,
  });
  console.debug({ data, error, errors });
  if (typeof error !== 'undefined') {
    throw new Error(error.message);
  }
  if (
    typeof errors !== 'undefined' &&
    Array.isArray(errors) &&
    errors.length > 0
  ) {
    console.debug(errors);
    throw new Error('GraphQL errors occurred');
  }
  return data;
}
