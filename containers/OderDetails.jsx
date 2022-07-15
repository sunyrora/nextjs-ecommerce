import Link from 'next/link';
import CartItemsTable from './CartItemsTable';

const OderDetails = ({ order }) => {
  const {
    _id,
    user,
    shippingAddress,
    paymentMethod,
    orderItems,
    itemsTotal,
    tax,
    shippingCost,
    totalCost,
    isDelivered,
    deliveredAt,
    isPaid,
    paidAt,
  } = order;

  return (
    <div className="space-y-5">
      <Link
        href={{
          pathname: '/orders/orderHistory',
          query: {
            userId: user,
          },
        }}
      >
        <button className="secondary-button text-sm" type="button">
          Go to Order History
        </button>
      </Link>
      <div className="grid md:grid-cols-4 md:gap-5 w-full">
        <div className="overlow-x-auto md:col-span-3">
          <h1 className="mb-4 text-xl">{`Order No. ${_id}`}</h1>
          <div className="card p-5">
            <h2 className="mb-2 text-lg">Shipping Address</h2>
            <div>
              {shippingAddress.fullName}, {shippingAddress.address}
              {shippingAddress.city}, {shippingAddress.country}
            </div>
            <div className="mt-3">
              {/* <button
              // onClick={() => handleModify(0)}
              className="primary-button"
            >
              Edit
            </button> */}
              {isDelivered ? (
                <div className="alert-success">Delivered at {deliveredAt}</div>
              ) : (
                <div className="alert-error">Not delivered</div>
              )}
            </div>
          </div>
          <div className="card p-5">
            <h2 className="mb-2 text-lg">Pament Method</h2>
            <div>{paymentMethod}</div>
            <div className="mt-3">
              {/* <button
              // onClick={() => handleModify(1)}
              className="primary-button"
            >
              Edit
            </button> */}
              {isPaid ? (
                <div className="alert-success">Paid at {paidAt}</div>
              ) : (
                <div className="alert-error">Not paid</div>
              )}
            </div>
          </div>
          <div className="card overflow-x-auto p-5">
            <h2 className="mb-2 text-lg">Order Items</h2>
            <CartItemsTable cartItems={orderItems} fromCart={false} />
            {/* <div className="mt-3">
            <button
              // onClick={() => router.push('/cart')}
              className="primary-button"
            >
              Edit
            </button>
          </div> */}
          </div>
        </div>
        <div className="overlow-x-auto md:col-span-1">
          <div className="card p-5">
            <h2 className="mb-2 text-lg">Order Summary</h2>
            <ul>
              <li>
                <div className="mb-2 flex justify-between">
                  <div>Items</div>
                  <div>${itemsTotal}</div>
                </div>
              </li>
              <li>
                <div className="mb-2 flex justify-between">
                  <div>Tax</div>
                  <div>${tax}</div>
                </div>
              </li>
              <li>
                <div className="mb-2 flex justify-between">
                  <div>Shipping</div>
                  <div>${shippingCost}</div>
                </div>
              </li>
              <li>
                <div className="mb-2 flex justify-between">
                  <div>Total</div>
                  <div>${totalCost}</div>
                </div>
              </li>
              {/* <li>
                <button
                  className={`${isLoading && 'disabled'} primary-button w-full`}
                  disabled={isLoading}
                  onClick={handlePlaceOrder}
                >
                  Place Order
                </button>
              </li> */}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OderDetails;
