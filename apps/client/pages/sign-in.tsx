import React from 'react';
import { signIn } from 'next-auth/react';

export default function SignIn() {
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    const formData = new FormData(e.currentTarget);
    try {
      console.log(1.1);
      const p = await signIn('credentials', {
        email: formData.get('email').toString(),
        password: formData.get('password').toString(),
        callbackUrl: '/',
      });
      console.log(JSON.stringify(p, null, 2));
      console.log(1.2);
    } catch (err) {
      console.log(err);
      console.log(1.3);
    }
  };

  return (
    <div className="max-w-xl p-16">
      <form
        className="w-full flex flex-col space-y-4"
        method="POST"
        onSubmit={onSubmit}
      >
        <input type="email" name="email" placeholder="Your email" />
        <input type="password" name="password" placeholder="Password" />
        <button type="submit">Iniciar</button>
      </form>
    </div>
  );
}
