import CartItem from '../components/CartItem';
import { Store } from '../utils/redux/Store';
import { useContext } from 'react';
import {
  MODIFY_QUANTITY,
  REMOVE_FROM_CART,
} from '../utils/redux/constants/cartConstants';

function CartItemsTable({ cartItems, fromCart = true }) {
  const { state, dispatch } = useContext(Store);

  function handleRemoveFromCart(id) {
    dispatch({ type: REMOVE_FROM_CART, payload: { id } });
  }

  function handleQtyChange(_id, qty) {
    dispatch({ type: MODIFY_QUANTITY, payload: { _id, qty } });
  }

  return (
    <div className="table w-full">
      <div className="table-header-group font-bold">
        <div className="table-row overflow-x-auto">
          <div className="table-cell cart-item-row">Item</div>
          <div className="table-cell cart-item-row">Quantity</div>
          <div className="table-cell cart-item-row">Price</div>
          <div className="table-cell cart-item-row">
            {!fromCart && 'SubTotal'}
          </div>
        </div>
      </div>
      {fromCart
        ? cartItems?.map((item) => (
            <CartItem
              key={item._id}
              item={item}
              onRemoveFromCart={handleRemoveFromCart}
              onQtyChange={handleQtyChange}
            />
          ))
        : cartItems?.map((item) => <CartItem key={item._id} item={item} />)}
    </div>
  );
}

export default CartItemsTable;
