import CartItem from '../components/CartItem';
import { Store } from '../utils/redux/Store';
import { useContext } from 'react';
import {
  MODIFY_QUANTITY,
  REMOVE_FROM_CART,
} from '../utils/redux/constants/cartConstants';

function CartItemsTable({ cartItems }) {
  const { state, dispatch } = useContext(Store);

  function handleRemoveFromCart(id) {
    dispatch({ type: REMOVE_FROM_CART, payload: { id } });
  }

  function handleQtyChange(id, qty) {
    dispatch({ type: MODIFY_QUANTITY, payload: { id, qty } });
  }

  return (
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
        <CartItem
          key={item._id}
          item={item}
          onRemoveFromCart={handleRemoveFromCart}
          onQtyChange={handleQtyChange}
        />
      ))}
    </div>
  );
}

export default CartItemsTable;
