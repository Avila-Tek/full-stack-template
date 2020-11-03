import React from 'react';
import Link from 'next/link';
import { ApolloError } from '@apollo/client';
import { User } from '../../models';
import Table from '../Table';
import Card from '../Card';
import TableLoader from '../TableLoader';

interface UserTableProps {
  users: Array<User>;
  loading: boolean;
  error?: ApolloError;
}

export default function UserTable({ users, loading, error }: UserTableProps) {
  const [data, setData] = React.useState<Array<{ [k: string]: any }>>([]);
  const header = [
    {
      Header: 'Nombre',
      accessor: 'name',
      Cell: ({ row: { index }, data: _data }) => _data[index].name(),
    },
    {
      Header: 'Acciones',
      accessor: 'action',
      Cell: ({ row: { index }, data: _data }) => _data[index].action(),
    },
  ];
  React.useEffect(() => {
    setData(
      users.map(({ _id, slug, firstName, lastName, active }) => ({
        name() {
          return (
            <>
              <div
                className={`h-2 w-2 mr-1 inline-block rounded-full ${
                  active ? 'bg-green-700' : 'bg-red-700'
                }`}
              >
                <span className="sr-only">
                  {active ? 'Activo' : 'Eliminado'}
                </span>
              </div>
              {firstName} {lastName}
            </>
          );
        },
        action() {
          return (
            <div className="float-right">
              <Link href="/app/users/[slug]" as={`/app/users/${slug}`}>
                <a className="text-indigo-700 p-1 float-right">
                  <svg
                    fill="currentColor"
                    className="w-5 h-5"
                    viewBox="0 0 20 20"
                  >
                    <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                    <path
                      d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                      clipRule="evenodd"
                      fillRule="evenodd"
                    />
                  </svg>
                  <span className="sr-only">Editar</span>
                </a>
              </Link>
            </div>
          );
        },
      }))
    );
  }, [users]);
  return (
    <section className="flex flex-col flex-wrap mx-auto">
      <div className="flex flex-row flex-wrap -mx-4">
        <div className="px-4 w-1/2">
          <h2 className="text-gray-600 text-lg font-semibold">Usuarios</h2>
        </div>
        <div className="px-4 w-1/2 flex">
          <div className="ml-auto">
            <Link href="/app/users/create">
              <a className="bg-transparent py-1 cursor-pointer uppercase text-sm text-primary-500 font-semibold flex flex-row flex-wrap">
                <svg
                  fill="currentColor"
                  className="h-4 w-4 mr-1 my-auto"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                    clipRule="evenodd"
                    fillRule="evenodd"
                  />
                </svg>
                Usuario
              </a>
            </Link>
          </div>
        </div>
      </div>
      <Card>
        {loading ? (
          <TableLoader />
        ) : (
          <Table
            headers={header}
            content={data}
            href="/app/users/create"
            as="/app/users/create"
            text="Usuario"
          />
        )}
      </Card>
    </section>
  );
}
