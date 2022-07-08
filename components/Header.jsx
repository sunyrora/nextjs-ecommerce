import Link from 'next/link';
import { useContext, useEffect } from 'react';
import { CART_RESET } from '../utils/redux/constants/cartConstants';
import { KEY_CART_LOCALSTORAGE } from '../utils/redux/constants/globalConstants';
import { Store } from '../utils/redux/Store';

function Header() {
  const { state, dispatch } = useContext(Store);

  useEffect(() => {
    // To make cart items stay when refresh page
    const cartLocalStorage = localStorage.getItem(KEY_CART_LOCALSTORAGE);
    if (cartLocalStorage) {
      dispatch({ type: CART_RESET, payload: JSON.parse(cartLocalStorage) });
    }
  }, []);

  return (
    <nav>
      <div className="flex flex-row px-4 h-12 items-center  justify-between shadow-md">
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
          <Link href="/login">
            <a>Login</a>
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Header;
