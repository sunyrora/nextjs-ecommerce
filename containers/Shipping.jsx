import { Store } from '../utils/redux/Store';
import ChekoutWizard from './ChekoutWizard';
import ShippingAddress from './ShippingAddress';
import Payment from './Payment';
import { useContext, useEffect, useState } from 'react';
import PlaceOrder from './PlaceOrder';
import { CART_CHECKOUT_ACTIVE_STEP } from '../utils/redux/constants/cartConstants';

function Shipping() {
  const steps = [
    {
      step: 0,
      label: 'Shipping Addrees',
      component: <ShippingAddress />,
    },
    {
      step: 1,
      label: 'Payment Method',
      component: <Payment />,
    },
    {
      step: 2,
      label: 'Place Order',
      component: <PlaceOrder />,
    },
  ];

  const { state, dispatch } = useContext(Store);
  const [activeStep, setActiveStep] = useState(steps[0].step);
  const [ActiveComponent, setActiveComponent] = useState(steps[0].component);

  useEffect(() => {
    setActiveStep(state.cart?.activeStep ?? '');
  }, []);

  useEffect(() => {
    setActiveComponent(steps[activeStep]?.component);
    dispatch({
      type: CART_CHECKOUT_ACTIVE_STEP,
      payload: activeStep,
    });
  }, [activeStep]);

  const handleStepchange = (step) => {
    if (step < 0 || step > steps.length - 1) {
      return;
    }
    setActiveStep(step);
  };

  return (
    <ChekoutWizard
      steps={steps}
      activeStep={activeStep}
      onClickStep={handleStepchange}
    >
      {ActiveComponent}
    </ChekoutWizard>
  );
}
export default Shipping;
