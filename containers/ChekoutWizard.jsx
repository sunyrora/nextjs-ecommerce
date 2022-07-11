function ChekoutWizard({ activeStep = 0, children }) {
  return (
    <div className="flex flex-col justify-center content-center w-full max-w-5xl">
      <div className="mb-5 flex flex-wrap justify-around w-full">
        {['Shipping Address', 'Pament Method', 'Place Order'].map(
          (step, index) => (
            <div
              key={step}
              className={`p-2 my-3 grow flex-auto border-b-2 border-gray-500 ${
                activeStep >= index &&
                'border-indigo-500 text-indigo-500 font-bold'
              }`}
            >
              {step}
            </div>
          )
        )}
      </div>
      <div>{children}</div>
    </div>
  );
}

export default ChekoutWizard;
