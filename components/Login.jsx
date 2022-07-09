import Link from 'next/link';
import { useForm } from 'react-hook-form';

function Lgoin() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = ({ email, password }) => {
    console.log('email: ', email, 'password: ', password);
  };

  return (
    <div className="flex items-center justify-center rounded-lg border-gray-200 shadow-md w-full p-5 m-5">
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
                <div className="form-error-message">{errors.email.message}</div>
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
                    message: 'password is more than 5 chars',
                  },
                })}
                id="password"
                placeholder="Enter your password"
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
          <Link href="register">
            <a className="font-bold">Register</a>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Lgoin;
