import OrderItem from '../components/OrderItem';

const OrderHistory = ({ orders }) => {
  return (
    <div className="table w-full max-w-5xl">
      <div className="table-header-group font-bold">
        <div className="table-row overflow-x-auto">
          <div className="table-cell order-item-row">ID</div>
          <div className="table-cell order-item-row">Date</div>
          <div className="table-cell order-item-row">Total</div>
          <div className="table-cell order-item-row">Paid</div>
          <div className="table-cell order-item-row">Deliverd</div>
        </div>
      </div>
      {orders?.map((order) => {
        return <OrderItem key={order._id} item={order} />;
      })}
    </div>
  );
};

export default OrderHistory;
