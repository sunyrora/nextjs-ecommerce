import CartItem from '../components/CartItem';

function CartItemsTable({ cartItems }) {
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
        <CartItem key={item._id} item={item} />
      ))}
    </div>
  );
}

export default CartItemsTable;
