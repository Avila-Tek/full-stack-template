'use client';

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { FormEvent } from 'react';

export default function SignInform() {
  const router = useRouter();
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    try {
      const res = await signIn('credentials', {
        email: formData.get('email')?.toString(),
        password: formData.get('password')?.toString(),
        redirect: false,
      }).catch((res) => {
        console.log('err', res);
      });
      if (res?.ok) {
        router.push('/');
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <form className="" method="POST" onSubmit={onSubmit}>
      <div className="">
        <label htmlFor="" className="">
          Email
        </label>
        <input type="email" name="email" id="email" className="" />
      </div>
      <div className="">
        <label htmlFor="" className="">
          Password
        </label>
        <input type="password" name="password" id="password" className="" />
      </div>
      <div className="">
        <button type="submit">Sign In</button>
      </div>
    </form>
  );
}
