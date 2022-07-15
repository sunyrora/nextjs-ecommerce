import axios from 'axios';
import { useRouter } from 'next/router';
import { forwardRef, useContext, useEffect, useState } from 'react';
import { LOGIN_REQUIRED } from '../utils/constants/errorMessages';
import { CART_CLEAR_ITEMS } from '../utils/redux/constants/cartConstants';
import { Store } from '../utils/redux/Store';
import { round2 } from '../utils/utils';
import CartItemsTable from './CartItemsTable';

const PlaceOrder = forwardRef((props, ref) => {
  const { state, dispatch } = useContext(Store);
  const { handleModify } = props;
  const router = useRouter();
  const { pathname } = router;
  const {
    cart: { cartItems, shippingAddress, paymentMethod, subTotal },
  } = state;

  const [isLoading, setLoading] = useState(false);

  const itemsTotal = round2(subTotal);
  const tax = round2(itemsTotal * 0.15);
  const shippingCost = itemsTotal > 200 ? 0 : 15;
  const totalCost = round2(subTotal + tax + shippingCost);

  useEffect(() => {
    if (!paymentMethod) {
      alert('Payment Method is required.');
      handleModify(1);
    }
    if (!shippingAddress) {
      alert('Enter your addreess');
      handleModify(0);
    }
  }, []);

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post('/api/orders/place-order', {
        orderItems: cartItems,
        shippingAddress,
        paymentMethod,
        itemsTotal,
        tax,
        shippingCost,
        totalCost,
      });

      setLoading(false);
      dispatch({
        type: CART_CLEAR_ITEMS,
      });

      // update count in stock
      const { data: dataUpdateStock } = await axios.post(
        '/api/orders/updateStock',
        {
          items: cartItems,
        }
      );

      console.log('dataUpdateStock: ', dataUpdateStock);

      router.push({
        pathname: `/orders/${data._id}`,
        // query: { order: JSON.stringify(data) },
      });
    } catch (error) {
      setLoading(false);
      console.error('Place Order error: ', error);
      const { response } = error;
      if (response.status === 401) {
        if (response.data === LOGIN_REQUIRED) {
          router.push({
            pathname: '/unauthorized',
            query: {
              message: 'Login required',
              redirect: pathname ?? '/',
            },
          });
        }
      }
    }
  };

  return (
    <div className="grid md:grid-cols-4 md:gap-5 w-full">
      <div className="overlow-x-auto md:col-span-3">
        <div className="card p-5">
          <h2 className="mb-2 text-lg">Shipping Address</h2>
          <div>
            {shippingAddress.fullName}, {shippingAddress.address}
            {shippingAddress.city}, {shippingAddress.country}
          </div>
          <div className="mt-3">
            <button onClick={() => handleModify(0)} className="primary-button">
              Edit
            </button>
          </div>
        </div>
        <div className="card p-5">
          <h2 className="mb-2 text-lg">Pament Method</h2>
          <div>{paymentMethod}</div>
          <div className="mt-3">
            <button onClick={() => handleModify(1)} className="primary-button">
              Edit
            </button>
          </div>
        </div>
        <div className="card overflow-x-auto p-5">
          <h2 className="mb-2 text-lg">Order Items</h2>
          <CartItemsTable cartItems={cartItems} fromCart={false} />
          <div className="mt-3">
            <button
              onClick={() => router.push('/cart')}
              className="primary-button"
            >
              Edit
            </button>
          </div>
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
            <li>
              <button
                className={`${isLoading && 'disabled'} primary-button w-full`}
                disabled={isLoading}
                onClick={handlePlaceOrder}
              >
                Place Order
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
});

export default PlaceOrder;
