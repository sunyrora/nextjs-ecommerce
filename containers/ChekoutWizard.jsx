function ChekoutWizard({ steps = [], activeStep = 0, onClickStep, children }) {
  const handleCheckoutPage = (step) => {
    onClickStep(step);
  };

  const handleClickNext = () => {
    const clickNext = steps[activeStep].onClickNext
      ? steps[activeStep].onClickNext(steps[activeStep].ref, () =>
          handleCheckoutPage(activeStep + 1)
        )
      : null;
    clickNext ? clickNext() : handleCheckoutPage(activeStep + 1);
  };

  return (
    <div className="flex flex-col justify-center content-center w-full max-w-3xl">
      <button className="mb-5 flex flex-wrap justify-around w-full">
        {steps.map((step) => {
          return (
            <div
              onClick={() => handleCheckoutPage(step.step)}
              key={step.label}
              className={`p-2 my-3 grow flex-auto border-b-2 border-gray-500 ${
                activeStep >= step.step &&
                'border-indigo-500 text-indigo-500 font-bold'
              }`}
            >
              <span>{step.label}</span>
            </div>
          );
        })}
      </button>
      <div className="flex justify-center">{children}</div>

      <div className="my-5 flex justify-between">
        <button
          onClick={() => handleCheckoutPage(activeStep - 1)}
          className="default-button disabled:invisible"
          disabled={activeStep <= 0}
        >
          Back
        </button>
        <button onClick={handleClickNext} className="primary-button">
          Next
        </button>
      </div>
    </div>
  );
}

export default ChekoutWizard;
