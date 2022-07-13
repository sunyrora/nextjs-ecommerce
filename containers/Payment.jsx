import {
  forwardRef,
  useContext,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';
import { CART_CHECKOUT_PAYMENT_METHOD } from '../utils/redux/constants/cartConstants';
import { Store } from '../utils/redux/Store';

const Payment = forwardRef((props, ref) => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const { state, dispatch } = useContext(Store);
  const { paymentMethod } = state.cart;

  useEffect(() => {
    setSelectedPaymentMethod(paymentMethod ?? '');
  }, []);

  useEffect(() => {
    dispatch({
      type: CART_CHECKOUT_PAYMENT_METHOD,
      payload: selectedPaymentMethod,
    });
  }, [selectedPaymentMethod]);

  const handleSelectPaymentMethod = (e) => {
    setSelectedPaymentMethod(e.target.value);
  };

  useImperativeHandle(ref, () => ({
    checkValidation,
  }));

  const checkValidation = () => {
    if (!selectedPaymentMethod) {
      alert('Payment Method is required.');
      return false;
    }

    return true;
  };

  return (
    <form className="mx-auto mzs-w-screen-md">
      <legend className="pb-3">Choose a payment method</legend>
      <fieldset
        id="paymentMethod"
        className="fieldset-paymentMethod flex flex-col"
      >
        {['Paypal', 'Stripe', 'CachOnDelivery'].map((method) => (
          <div key={method}>
            <input
              type="radio"
              className="outline-none focus:ring-0 checked:bg-blue-500 default:ring"
              value={method}
              id={method}
              name="paymentMethod"
              checked={selectedPaymentMethod === method}
              onChange={(e) => handleSelectPaymentMethod(e)}
            />
            <label htmlFor={method}>{method}</label>
          </div>
        ))}
      </fieldset>
    </form>
  );
});

export default Payment;
