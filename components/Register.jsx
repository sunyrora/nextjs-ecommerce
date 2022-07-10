import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { useSession, signIn } from 'next-auth/react';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { ERROR_USER_EXIST } from '../utils/redux/constants/errorMessages';

function Register() {
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
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async ({ username, email, password }) => {
    console.log(
      'username: ',
      username,
      'email: ',
      email,
      'password: ',
      password
    );
    try {
      await axios.post('/api/auth/register', {
        username,
        email,
        password,
      });

      console.log('Register result: ', result);

      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });
      if (result.error) {
        console.error('signIn error: ', result);
      }

      console.log('login result: ', result);
    } catch (error) {
      if (error.response.data.error === ERROR_USER_EXIST) {
        alert('You already have an account. Go to Login');
        router.push(`/login?redirect=?${redirect || '/'}`);

        return;
      }

      console.error('Register error: ', error);
    }
  };

  return (
    <div className="flex items-center justify-center rounded-lg border-gray-200 shadow-md w-full p-5 m-5">
      {!session?.user && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col justify-center max-w-xl"
        >
          <h1 className="mb-5 text-xl text-center">Create Account</h1>
          <div className="register-form ">
            <div className="inline-grid grid-cols-4 gap-5 overflow-x-auto items-center">
              <label className="col-span-1" htmlFor="username">
                Name
              </label>
              <div className="col-span-3 p-1">
                <input
                  type="text"
                  {...register('username', {
                    required: 'Please enter your name',
                  })}
                  id="username"
                  placeholder="Enter your name"
                  className="w-full border-b"
                  autoFocus
                />
                {errors.username && (
                  <div className="form-error-message">
                    {errors.username.message}
                  </div>
                )}
              </div>
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
              <label className="col-span-1" htmlFor="confirm_password">
                Confirm Password
              </label>
              <div className="col-span-3 p-1">
                <input
                  type="password"
                  {...register('confirm_password', {
                    required: 'Password not match',
                    validate: (value) => value === getValues('password'),
                    minLength: {
                      value: 6,
                      message: 'Password not match',
                    },
                  })}
                  id="confirm_password"
                  placeholder="Confirm your password"
                  autoComplete="off"
                  className="w-full border-b"
                />
                {errors.confirm_password && (
                  <div className="form-error-message">
                    {errors.confirm_password.message}
                  </div>
                )}
              </div>
            </div>
          </div>
          <button className="primary-button my-5">Register</button>
          <div>
            {`Already have an account? `}
            <Link href={`/login?redirect=?${redirect || '/'}`}>
              <a className="font-bold">Login</a>
            </Link>
          </div>
        </form>
      )}
    </div>
  );
}

export default Register;
