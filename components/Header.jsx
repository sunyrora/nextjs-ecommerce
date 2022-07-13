import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { useContext } from 'react';
import { Store } from '../utils/redux/Store';
import Dropdown from './Dropdown';

function Header() {
  const { status, data: session } = useSession();
  const { state, dispatch } = useContext(Store);

  const dropdownMenuItems = [
    {
      handleOnClick: () => {},
      label: 'Profile',
    },
    {
      handleOnClick: () => {},
      label: 'Oder History',
    },
    {
      handleOnClick: () => {
        signOut({ callbackUrl: '/login' });
      },
      label: 'Logout',
    },
  ];

  return (
    <nav className="fixed w-full">
      <div className="flex flex-row px-4 h-12 items-center  justify-between bg-white/95 shadow-md">
        <Link href="/">
          <a className="text-lg font-bold">Home</a>
        </Link>
        <div className="nav_link_right flex items-center">
          <Link href="/cart">
            <a>
              Cart
              <span className="ml-1 px-2 py-1 rounded-full h-6 w-6 bg-red-400 text-white text-center text-xs font-bold">
                {state.cart.itemCount}
              </span>
            </a>
          </Link>
          {status == 'loading' ? (
            'Loading'
          ) : session?.user ? (
            <>
              {/* <span>{session.user.name}</span> */}
              <Dropdown
                data={{ label: session.user.name, items: dropdownMenuItems }}
              />
              {/* <button
                onClick={() => signOut()}
                className="secondary-button text-xs px-2"
              >
                Logout
              </button> */}
            </>
          ) : (
            <Link href="/login">
              <a>Login</a>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Header;
