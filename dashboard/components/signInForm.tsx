import React from 'react';
import nProgress from 'nprogress';
import { useRouter } from 'next/router';
import { useMutation } from '@apollo/client';
import { validateEmail } from 'avilatek-utils';
import { SIGN_IN, RESET_PASSWORD } from './auth/graphql';
import { User } from '../models';
import Input from './Input';
import useNotify from '../hooks/useNotify';
import useUser from '../hooks/useUser';

function SignInForm() {
  const notify = useNotify();
  const [, setUser] = useUser();
  const router = useRouter();
  const emailRef = React.useRef<HTMLInputElement>();
  const passwordRef = React.useRef<HTMLInputElement>();
  const [disabled, setDisabled] = React.useState(false);
  const [signIn] = useMutation<{ signIn: User }>(SIGN_IN);
  const [resetPassword] = useMutation(RESET_PASSWORD);
  const forgotPassword = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    try {
      e.persist();
      e.preventDefault();
      if (!validateEmail(emailRef.current.value)) {
        return notify(
          'Por favor llene el campo de correo electrónico',
          'danger'
        );
      }
      const { data } = await resetPassword({
        variables: {
          data: {
            email: emailRef.current.value,
          },
        },
      });
      if (data?.resetPassword?.success) {
        notify(
          'Se ha enviado un correo electrónico para restablecer su contraseña',
          'success'
        );
      } else {
        notify(data?.resetPassword?.err ?? 'Ha ocurrido un error.', 'danger');
      }
    } catch (err) {
      notify(err.message, 'danger');
    }
  };
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const email = emailRef.current.value;
      const password = passwordRef.current.value;
      nProgress.start();
      setDisabled(true);
      const { data } = await signIn({
        variables: {
          data: {
            email,
            password,
          },
        },
      });
      if (data.signIn) {
        if (data?.signIn?.privilege >= 1) {
          setUser(data?.signIn ?? {});
          // await refetchUser();
          await router.push('/app');
        } else {
          notify(
            'Usted no se encuentra autorizado para ingresar esta pagina web',
            'danger'
          );
          await router.push('/sign-in');
        }
      } else {
        notify('Ha ocurrido un error', 'danger');
      }
    } catch (err) {
      notify(err.message, 'danger');
    } finally {
      nProgress.done();
      setDisabled(false);
    }
  };
  return (
    <section className="w-full h-full min-h-screen flex flex-row flex-wrap bg-white">
      <article className="w-full md:w-1/2 min-h-screen h-full flex flex-col flex-wrap justify-between px-16 py-16">
        <h2 className="text-2xl font-semibold text-gray-500 mb-8">
          Iniciar Sesión
        </h2>
        <form
          method="POST"
          className="flex flex-col flex-wrap"
          onSubmit={onSubmit}
        >
          <div className="w-full">
            <Input
              label="Correo Electrónico"
              name="email"
              type="email"
              placeholder="Ingrese un correo electrónico"
              _ref={emailRef}
              required
            />
          </div>
          <div className="w-full">
            <Input
              label="Contraseña"
              name="password"
              type="password"
              placeholder="Ingrese su contraseña"
              _ref={passwordRef}
              required
            />
          </div>
          <div className="w-full">
            <button
              type="submit"
              className="px-4 py-2 bg-primary-500 rounded shadow-xl text-white float-right"
              disabled={disabled}
            >
              Iniciar Sesión
            </button>
          </div>
          <button
            className="text-primary-500 rounded-lg px-4 py-2 mx-auto md:ml-0 md:mr-auto"
            onClick={forgotPassword}
            type="button"
          >
            ¿Olvido su contraseña?
          </button>
        </form>
        <div className="text-sm text-gray-500">
          © {new Date().getFullYear()} C.A. Cigarrera Bigott Sucs. Desarrollado
          por{' '}
          <a
            href="https://avilatek.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-gray-800 text-sm font-semibold py-1"
          >
            Avila Tek
          </a>
        </div>
      </article>
      <article className="w-full md:w-1/2 min-h-screen h-full bg-primary-500 p-16 flex">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          data-name="Layer 1"
          viewBox="0 0 528.717 699.768"
          className="h-96 w-auto m-auto"
        >
          <path fill="#535461" d="M0 17.063H444V674.063H0z" />
          <path
            fill="#fff"
            d="M323 691.063L0 674.063 0 17.063 323 0.063 323 691.063z"
          />
          <circle cx="296" cy="377.063" r="4" fill="#535461" />
          <path
            fill="#535461"
            d="M296 377.66L298.773 382.463 301.545 387.265 296 387.265 290.455 387.265 293.227 382.463 296 377.66z"
          />
          <path
            fill="#fff"
            d="M337 691.063L317.217 691 318 0.063 337 0.063 337 691.063z"
          />
          <path
            fill="#fff"
            d="M337.217 691L317.217 691 318.217 0 337.217 0 337.217 691z"
            opacity="0.1"
          />
          <circle cx="296" cy="348.063" r="13" opacity="0.1" />
          <circle cx="296" cy="346.063" r="13" fill="#535461" />
          <path
            fill="none"
            stroke="#000"
            strokeMiterlimit="10"
            strokeWidth="2"
            d="M52.819 16.108L52.819 677.156"
            opacity="0.1"
          />
          <path
            fill="none"
            stroke="#000"
            strokeMiterlimit="10"
            strokeWidth="2"
            d="M109.819 12.108L109.819 679.156"
            opacity="0.1"
          />
          <path
            fill="none"
            stroke="#000"
            strokeMiterlimit="10"
            strokeWidth="2"
            d="M166.819 9.108L166.819 683"
            opacity="0.1"
          />
          <path
            fill="none"
            stroke="#000"
            strokeMiterlimit="10"
            strokeWidth="2"
            d="M223.819 6.108L223.819 687.156"
            opacity="0.1"
          />
          <path
            fill="none"
            stroke="#000"
            strokeMiterlimit="10"
            strokeWidth="2"
            d="M280.819 3.108L280.819 688"
            opacity="0.1"
          />
          <ellipse cx="463.217" cy="95.323" fill="#2f2e41" rx="39.5" ry="37" />
          <path
            fill="#ffb8b8"
            d="M683.859 425.94l-10 14s-48 10-30 25 44-14 44-14l14-18z"
            transform="translate(-335.641 -100.116)"
          />
          <path
            fill="#fff"
            d="M735.859 266.94s-13 0-16 18-6 78-6 78-42 55-35 62 15 20 20 18 48-61 48-61z"
            transform="translate(-335.641 -100.116)"
          />
          <path
            d="M735.859 266.94s-13 0-16 18-6 78-6 78-42 55-35 62 15 20 20 18 48-61 48-61z"
            opacity="0.1"
            transform="translate(-335.641 -100.116)"
          />
          <path
            fill="#ffb8b8"
            d="M775.859 215.94s-1 39-13 41-8 15-8 15 39 23 65 0l5-12s-18-13-10-31z"
            transform="translate(-335.641 -100.116)"
          />
          <path
            fill="#2f2e41"
            d="M708.859 455.94s-59 110-37 144 55 104 60 104 33-14 31-23-32-76-40-82-4-22-3-23 34-54 34-54-1 84 3 97-1 106 4 110 28 11 32 5 16-97 8-118l15-144z"
            transform="translate(-335.641 -100.116)"
          />
          <path
            fill="#2f2e41"
            d="M762.859 722.94l-25 46s-36 26-11 30 40-6 40-6l22-16v-46z"
            transform="translate(-335.641 -100.116)"
          />
          <path
            fill="#2f2e41"
            d="M728.859 696.94l13 31s5 13 0 16-19 21-10 23a29.3 29.3 0 005.495.546 55.566 55.566 0 0040.398-16.44l8.107-8.107s-27.77-63.948-27.385-63.474-29.615 17.474-29.615 17.474z"
            transform="translate(-335.641 -100.116)"
          />
          <circle cx="465.217" cy="105.823" r="34" fill="#ffb8b8" />
          <path
            fill="#fff"
            d="M820.359 253.44l-10.5 10.5s-32 12-47 0c0 0 5.5-11.5 5.5-10.5s-43.5 7.5-47.5 25.5 3 49 3 49-28 132-17 135 114 28 113 9 8-97 8-97l35-67s-5-22-17-29-25.5-25.5-25.5-25.5z"
            transform="translate(-335.641 -100.116)"
          />
          <path
            fill="#ffb8b8"
            d="M775.859 448.94l-13 8s-50 34-24 40 41-24 41-24l10-12z"
            transform="translate(-335.641 -100.116)"
          />
          <path
            d="M849.859 301.94l9 9s6 84-6 101-67 63-70 60-22-18-18-20 57.182-57.57 57.182-57.57l-4.182-77.43z"
            opacity="0.1"
            transform="translate(-335.641 -100.116)"
          />
          <path
            fill="#fff"
            d="M853.859 298.94l9 9s6 84-6 101-67 63-70 60-22-18-18-20 57.182-57.57 57.182-57.57l-4.182-77.43z"
            transform="translate(-335.641 -100.116)"
          />
          <path
            fill="#2f2e41"
            d="M786.797 157.645s-11.557-4.203-27.318 4.728l8.406 2.101s-12.608 1.05-14.184 17.862h5.778s-3.677 14.71 0 18.912l2.364-4.465 6.83 13.658 1.576-6.829 3.152 1.05 2.101-11.032s5.254 7.88 9.456 8.406v-6.83s11.558 13.134 15.235 12.609l-5.253-7.355 7.354 1.576-3.152-5.253 18.913 5.253-4.203-5.253 13.134 4.202 6.304 2.627s8.93-20.488-3.678-34.673-30.995-17.336-42.815-11.294z"
            transform="translate(-335.641 -100.116)"
          />
        </svg>
      </article>
    </section>
  );
}

export default SignInForm;
