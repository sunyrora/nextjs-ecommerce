import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { signIn, useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  LOGIN_ERROR_USER_NOT_EXIST,
  LOGIN_ERROR_INVALID_PASSWORD,
} from '../utils/constants/errorMessages';

function Lgoin() {
  const { data: session, status: sessionStatus } = useSession();
  const router = useRouter();
  const { redirect } = router.query;

  useEffect(() => {
    if (session?.user) {
      router.push(redirect || '/');
    }
  }, [router, session, redirect]);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  const onSubmit = async ({ email, password }) => {
    try {
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });
      if (result.error) {
        // console.error('signIn error: ', result);
        if (result.status === 401) {
          switch (result.error) {
            case LOGIN_ERROR_USER_NOT_EXIST:
              {
                setError('email', {
                  type: 'custom',
                  message: 'No account with this email.',
                });
              }
              break;
            case LOGIN_ERROR_INVALID_PASSWORD: {
              setError('password', {
                type: 'custom',
                message: "Password doesn't match",
              });
            }
          }
        }
      }
    } catch (error) {
      console.error('Login error: ', error);
    }
  };

  function handleAuth(providerID) {
    try {
      const { error, status, ok, url } = signIn(providerID);
      if (error) {
        console.error('signIn error: ', error, ' status: ', status);
      }
    } catch (error) {
      console.error('Login error: ', error);
    }
  }

  return (
    <div className="flex items-center justify-center rounded-lg border-gray-200 shadow-md w-full p-5 m-5">
      {!session?.user && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col justify-center max-w-xl"
        >
          <h1 className="mb-5 text-xl text-center">Login</h1>
          <div className="login-form ">
            <div className="inline-grid grid-cols-4 gap-5 overflow-x-auto items-center">
              <label className="col-span-1" htmlFor="email">
                Email
              </label>
              <div className="col-span-3 p-1">
                <input
                  type="email"
                  {...register('email', {
                    required: 'Please enter email',
                    pattern: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                  })}
                  id="email"
                  placeholder="Enter your email"
                  className="w-full border-b"
                  autoFocus
                />
                {errors.email && (
                  <div className="form-error-message">
                    {errors.email.message}
                  </div>
                )}
              </div>
              <label className="col-span-1" htmlFor="password">
                Password
              </label>
              <div className="col-span-3 p-1">
                <input
                  type="password"
                  {...register('password', {
                    required: 'Please enter password',
                    minLength: {
                      value: 6,
                      message: 'Password should be more than 5 chars',
                    },
                  })}
                  id="password"
                  placeholder="Enter your password"
                  autoComplete="off"
                  className="w-full border-b"
                />
                {errors.password && (
                  <div className="form-error-message">
                    {errors.password.message}
                  </div>
                )}
              </div>
            </div>
          </div>
          <button className="primary-button my-5">Login</button>
          <div>
            {`Don't have an account? `}
            <Link href={`/register?redirect=?${redirect || '/'}`}>
              <a className="font-bold">Register</a>
            </Link>
          </div>
          {process.env.NODE_ENV === 'development' && (
            <button
              className="secondary-button m-2 text-sm"
              onClick={(e) => handleAuth('google')}
            >
              SignIn with Google
            </button>
          )}
        </form>
      )}
    </div>
  );
}

export default Lgoin;
