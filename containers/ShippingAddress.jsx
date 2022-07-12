import { useRouter } from 'next/router';
import { forwardRef, useContext, useEffect, useImperativeHandle } from 'react';
import { useForm } from 'react-hook-form';
import { CART_SAVE_SHIPPING_ADDRESS } from '../utils/redux/constants/cartConstants';
import { Store } from '../utils/redux/Store';

const ShippingAddress = forwardRef((props, ref) => {
  const { state, dispatch } = useContext(Store);
  const router = useRouter();
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const { shippingAddress } = state.cart;
    if (shippingAddress) {
      const { fullName, address, city, postalCode, country } = shippingAddress;
      setValue('fullName', fullName);
      setValue('address', address);
      setValue('city', city);
      setValue('postalCode', postalCode);
      setValue('country', country);
    }
  }, [state]);

  function onSubmit({ fullName, address, city, postalCode, country }) {
    dispatch({
      type: CART_SAVE_SHIPPING_ADDRESS,
      payload: {
        fullName,
        address,
        city,
        postalCode,
        country,
      },
    });
  }

  const checkValidation = () => {
    handleSubmit(onSubmit)();
    return Object.keys(errors).length === 0;
  };
  useImperativeHandle(ref, () => ({
    checkValidation,
  }));

  return (
    <form
      id="Shipping Address"
      className="mx-auto max-w-screen-md"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="full-name">
        <label htmlFor="fullName">Full Name</label>
        <input
          type="text"
          className="w-full"
          id="fullName"
          autoFocus
          {...register('fullName', {
            required: 'Please enter your name',
          })}
          placeholder="Enter your name"
        />
        {errors.fullName && (
          <div className="form-error-message">{errors.fullName.message}</div>
        )}
      </div>

      <div className="address">
        <label htmlFor="fullName">Addrees</label>
        <input
          type="text"
          className="w-full"
          id="address"
          {...register('address', {
            required: 'Please enter your adress',
            minLength: {
              value: 3,
              message: 'Address should be more than 2 chars',
            },
          })}
          placeholder="Enter your adress"
        />
        {errors.adress && (
          <div className="form-error-message">{errors.adress.message}</div>
        )}
      </div>
      <div className="city">
        <label htmlFor="city">City</label>
        <input
          type="text"
          className="w-full"
          id="city"
          {...register('city', {
            required: 'Please enter your city',
          })}
          placeholder="Enter your city"
        />
        {errors.city && (
          <div className="form-error-message">{errors.city.message}</div>
        )}
      </div>
      <div className="postalCode">
        <label htmlFor="postalCode">Postal Code</label>
        <input
          type="text"
          className="w-full"
          id="postalCode"
          {...register('postalCode', {
            required: 'Please enter your postal code',
          })}
          placeholder="Enter your postal code"
        />
        {errors.postalCode && (
          <div className="form-error-message">{errors.postalCode.message}</div>
        )}
      </div>
      <div className="country">
        <label htmlFor="country">Country</label>
        <input
          type="text"
          className="w-full"
          id="country"
          {...register('country', {
            required: 'Please enter your country',
          })}
          placeholder="Enter your country"
        />
        {errors.country && (
          <div className="form-error-message">{errors.country.message}</div>
        )}
      </div>
    </form>
  );
});
export default ShippingAddress;
