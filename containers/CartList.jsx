import Link from 'next/link';
import { Router, useRouter } from 'next/router';
import { useContext } from 'react';
import { Store } from '../utils/redux/Store';
import CartItemsTable from './CartItemsTable';

function CartList() {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  return (
    <div>
      <h1 className="mb4 text-xl">Shopping Cart</h1>
      {cartItems?.length <= 0 ? (
        <div>
          Your cart is empty. <Link href="/">Go shopping</Link>
        </div>
      ) : (
        <div className="flex flex-col md:flex-row">
          <CartItemsTable cartItems={cartItems} />
          <div className="card card-cart-chekcout">
            <p>Subtotal {state.cart.itemCount} items</p>
            <p className="font-bold"> ${state.cart.subTotal} </p>
            <button
              onClick={() => {
                router.push('/shipping');
              }}
              className="primary-button w-full font-bold"
            >
              Check OUt
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
export default CartList;
