import { Store } from '../utils/redux/Store';
import ChekoutWizard from './ChekoutWizard';
import ShippingAddress from './ShippingAddress';
import Payment from './Payment';
import { useContext, useEffect, useRef, useState } from 'react';
import PlaceOrder from './PlaceOrder';
import { CART_CHECKOUT_ACTIVE_STEP } from '../utils/redux/constants/cartConstants';
import { useRouter } from 'next/router';

function ShippingSteps({
  step,
  label,
  Component,
  onClickNext = null,
  ...props
}) {
  this.step = step;
  this.label = label;
  this.ref = useRef(null);
  this.component = <Component ref={this.ref} {...props} />;
  this.onClickNext = onClickNext;
}

function Shipping() {
  const router = useRouter();

  const steps = [
    new ShippingSteps({
      step: 0,
      label: 'Shipping Address',
      Component: ShippingAddress,
      onClickNext: (ref, next) => {
        return () => ref.current.handleSubmit(next);
      },
    }),
    new ShippingSteps({ step: 1, label: 'Payment Method', Component: Payment }),
    new ShippingSteps({
      step: 2,
      label: 'Place Order',
      Component: PlaceOrder,
      handleModify: (step) => {
        handleStepchange(step);
      },
    }),
  ];

  const { state, dispatch } = useContext(Store);
  const [activeStep, setActiveStep] = useState(steps[0].step);
  const [ActiveComponent, setActiveComponent] = useState(steps[0].component);

  useEffect(() => {
    if (state.cart.itemCount <= 0) {
      alert('Your cart is empty. Go to shopping!');
      router.push('/');
    } else {
      setActiveStep(state.cart?.activeStep ?? 0);
    }
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

    // if (nextStep > activeStep + 1) {
    //   nextStep = activeStep + 1;
    // }

    if (
      nextStep > activeStep &&
      steps[activeStep]?.ref?.current?.checkValidation &&
      !steps[activeStep]?.ref?.current?.checkValidation()
    ) {
      return;
    }

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
