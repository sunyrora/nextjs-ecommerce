import Link from 'next/link';
import { useContext } from 'react';
import CartItem from '../components/CartItem';
import { Store } from '../utils/redux/Store';

function CartList() {
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
        <div className="table w-full">
          <div className="table-header-group">
            <div className="table-row overflow-x-auto">
              <div className="table-cell cart-item-row">Item</div>
              <div className="table-cell cart-item-row">Quantity</div>
              <div className="table-cell cart-item-row">Price</div>
              <div className="table-cell cart-item-row"></div>
            </div>
          </div>
          {cartItems?.map((item) => (
            <CartItem key={item._id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}
export default CartList;
