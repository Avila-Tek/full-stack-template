import React from 'react';
import { signIn } from 'next-auth/react';

export default function SignIn() {
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    try {
      await signIn('credentials', {
        email: formData.get('email').toString(),
        password: formData.get('password').toString(),
        callbackUrl: '/',
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="max-w-xl p-16">
      <form className="w-full flex flex-col space-y-4" onSubmit={onSubmit}>
        <input type="email" name="email" placeholder="Your email" />
        <input type="password" name="password" placeholder="Password" />
        <button type="submit">Iniciar</button>
      </form>
    </div>
  );
}
