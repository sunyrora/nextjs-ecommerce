import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import ChekoutWizard from './ChekoutWizard';

function Payment() {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const router = useRouter();
  const { pathname } = router;
  return (
    // <ChekoutWizard activeStep={1} currPath={pathname}>
    <form className="mx-auto mzs-w-screen-md">
      <legend className="pb-3">Choose a payment method</legend>
      <fieldset
        id="paymentMethod"
        className="fieldset-paymentMethod flex flex-col"
      >
        {['Paypal', 'Stripe', 'CachOnDelivery'].map((method) => (
          <div
            key={method}
            //   onClick={() => setSelectedPaymentMethod(e.target.value)}
          >
            <input
              type="radio"
              className="outline-none focus:ring-0 checked:bg-blue-500 default:ring"
              value={method}
              id={method}
              name="paymentMethod"
              checked={selectedPaymentMethod === method}
              onChange={(e) => setSelectedPaymentMethod(e.target.value)}
            />
            <label htmlFor={method}>{method}</label>
          </div>
        ))}
      </fieldset>
      {/* <div className="mb-4 flex justify-between">
        <Link href={{ pathname: '/placeoder' }}>
          <button className="default-button">Next</button>
        </Link>
      </div> */}
    </form>
    // </ChekoutWizard>
  );
}

export default Payment;
