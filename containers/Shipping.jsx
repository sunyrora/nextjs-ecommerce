import { Store } from '../utils/redux/Store';
import ChekoutWizard from './ChekoutWizard';
import ShippingAddress from './ShippingAddress';
import Payment from './Payment';
import { useContext, useEffect, useRef, useState } from 'react';
import PlaceOrder from './PlaceOrder';
import { CART_CHECKOUT_ACTIVE_STEP } from '../utils/redux/constants/cartConstants';

function ShippingSteps(step, label, Component) {
  this.step = step;
  this.label = label;
  this.ref = useRef(null);
  this.component = <Component ref={this.ref} />;
}

function Shipping() {
  const steps = [
    new ShippingSteps(0, 'Shipping Address', ShippingAddress),
    new ShippingSteps(1, 'Payment Method', Payment),
    new ShippingSteps(2, 'Place Order', PlaceOrder),
  ];

  const { state, dispatch } = useContext(Store);
  const [activeStep, setActiveStep] = useState(steps[0].step);
  const [ActiveComponent, setActiveComponent] = useState(steps[0].component);

  useEffect(() => {
    setActiveStep(state.cart?.activeStep ?? 0);
  }, []);

  useEffect(() => {
    setActiveComponent(steps[activeStep]?.component);
    dispatch({
      type: CART_CHECKOUT_ACTIVE_STEP,
      payload: activeStep,
    });
  }, [activeStep]);

  const handleStepchange = (nextStep) => {
    if (nextStep < 0 || nextStep > steps.length - 1) {
      return;
    }

    if (
      nextStep > activeStep &&
      steps[activeStep]?.ref?.current?.checkValidation &&
      !steps[activeStep]?.ref?.current?.checkValidation()
    )
      return;

    setActiveStep(nextStep);
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
