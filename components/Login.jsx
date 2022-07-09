import Link from 'next/link';

function Lgoin() {
  return (
    <div className="flex items-center justify-center rounded-lg border-gray-200 shadow-md w-full p-5 m-5">
      <form action="" className="flex flex-col justify-center max-w-xl">
        <h1 className="mb-5 text-xl text-center">Login</h1>
        <div className="login-form flex space-x-5">
          <div className="mb-4 space-y-2 flex flex-col items-start">
            <label htmlFor="email">Email</label>
            <label htmlFor="password">Password</label>
          </div>
          <div className="mb-4 space-y-2 flex flex-col items-start">
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              className="w-full border-b"
              autoFocus
            />
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              className="w-full border-b"
            />
          </div>
        </div>
        <div className="primary-button">Login</div>
        <div className="my-3">
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
