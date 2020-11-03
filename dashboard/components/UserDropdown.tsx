import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import nProgress from 'nprogress';
import { createPopper } from '@popperjs/core';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { SIGN_OUT } from './auth/graphql';
import useNotify from '../hooks/useNotify';
import useUser from '../hooks/useUser';

function DropdownLink({ href, as, text }) {
  return (
    <Link href={href} as={as}>
      <a className="text-sm py-2 px-4 font-normal block w-full whitespace-no-wrap bg-transparent text-gray-800">
        {text}
      </a>
    </Link>
  );
}

function UserDropdown() {
  const router = useRouter();
  const notify = useNotify();
  const [user, setUser] = useUser();
  const [show, setShow] = React.useState(false);
  const btnRef = React.createRef<HTMLButtonElement>();
  const popoverRef = React.createRef<HTMLDivElement>();
  const [signOut] = useMutation(SIGN_OUT);
  const openDropdown = () => {
    createPopper(btnRef.current, popoverRef.current, {
      placement: 'bottom-end',
      modifiers: [
        {
          name: 'offset',
          options: {
            offset: [0, 10],
          },
        },
      ],
    });
    setShow(true);
  };
  const closeDropdown = () => {
    setShow(false);
  };
  const toggle = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (show) {
      closeDropdown();
    } else {
      openDropdown();
    }
  };
  const onClick = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    try {
      e.preventDefault();
      nProgress.start();
      await signOut();
      setUser(null);
      await router.push('/sign-in');
    } catch (err) {
      notify(err.message, 'danger');
    } finally {
      nProgress.done();
    }
  };
  return (
    <>
      <button
        type="button"
        ref={btnRef}
        onClick={toggle}
        className="text-gray-600 block bg-transparent focus:outline-none outline-none focus:shadow-outline-primary rounded-full"
      >
        <div className="items-center flex">
          <span className="w-12 h-12 text-sm text-white bg-gray-300 inline-flex items-center justify-center rounded-full">
            <Image
              alt="Profile"
              className="w-12 h-12 object-cover rounded-full align-middle border-none shadow"
              src={user?.photo ?? '/img/placeholder.png'}
              width={16 * 3}
              height={16 * 3}
            />
          </span>
        </div>
      </button>
      <div
        ref={popoverRef}
        className={`${
          show ? 'block' : 'hidden'
        } bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow`}
        style={{ minWidth: '12rem' }}
      >
        <DropdownLink
          href="/app/users/[slug]"
          as={`/app/users/${user?.slug}`}
          text="Perfil"
        />
        <div className="h-0 my-2 border border-solid border-gray-200" />
        <button
          type="button"
          className="text-sm py-2 px-4 font-normal block w-full whitespace-no-wrap bg-transparent text-gray-800 text-left"
          onClick={onClick}
        >
          Cerrar Sesión
        </button>
      </div>
    </>
  );
}

export default UserDropdown;
