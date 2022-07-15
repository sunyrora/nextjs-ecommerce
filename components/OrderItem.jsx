import Link from 'next/link';

const OrderItem = ({ item }) => {
  const {
    _id,
    createdAt,
    totalCost,
    isPaid,
    paidAt,
    isDelivered,
    deliveredAt,
  } = item;

  return (
    <Link href={`/orders/${item._id}`}>
      <div className="order-item-row-group table-row-group">
        <div className="table-row">
          <div className="table-cell order-item-row">{_id}</div>
          <div className="table-cell order-item-row">
            {createdAt.substring(0, 10)}
          </div>
          <div className="table-cell order-item-row">${totalCost}</div>
          <div className="table-cell order-item-row">
            {isPaid ? paidAt?.substring(0, 10) : 'No'}
          </div>
          <div className="table-cell order-item-row">
            {isDelivered ? deliveredAt?.substring(0, 10) : 'No'}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default OrderItem;
