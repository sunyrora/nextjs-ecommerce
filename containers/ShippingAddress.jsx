import {
  forwardRef,
  useContext,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';
import { useForm } from 'react-hook-form';
import InputFeild from '../components/InputFeild';
import { CART_SAVE_SHIPPING_ADDRESS } from '../utils/redux/constants/cartConstants';
import { Store } from '../utils/redux/Store';

const ShippingAddress = forwardRef((props, ref) => {
  const { state, dispatch } = useContext(Store);
  const [isValid, setValid] = useState(false);
  const {
    handleSubmit: formHandleSubmit,
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
  }, [state.cart]);

  const onSubmit = ({ fullName, address, city, postalCode, country }) => {
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

    setValid(true);
  };

  const checkValidation = () => {
    return isValid;
  };

  const handleSubmit = (next) => {
    formHandleSubmit(onSubmit)();
    setTimeout(() => {
      if (setValid) next();
    }, 500);
  };

  useImperativeHandle(ref, () => ({
    checkValidation,
    handleSubmit,
  }));

  return (
    <div className="w-2/3">
      <form
        id="Shipping Address"
        className="mx-auto max-w-screen-md"
        onSubmit={formHandleSubmit(onSubmit)}
      >
        <div className="full-name">
          <InputFeild
            type="text"
            id="fullName"
            label="Full Name"
            autoFocus={true}
            {...register('fullName', {
              required: 'Please enter your Name',
            })}
          />
          {errors.fullName && (
            <div className="form-error-message">{errors.fullName.message}</div>
          )}
        </div>

        <div className="address">
          <InputFeild
            type="text"
            id="address"
            label="Aderess"
            {...register('address', {
              required: 'Please enter your Address',
              minLength: {
                value: 3,
                message: 'Address should be more than 2 chars',
              },
            })}
          />
          {errors.address && (
            <div className="form-error-message">{errors.address.message}</div>
          )}
        </div>
        <div className="city">
          <InputFeild
            type="text"
            id="city"
            label="City"
            {...register('city', {
              required: 'Please enter your City',
            })}
          />
          {errors.city && (
            <div className="form-error-message">{errors.city.message}</div>
          )}
        </div>
        <div className="postalCode">
          <InputFeild
            type="text"
            id="postalCode"
            label="Postal Code"
            {...register('postalCode', {
              required: 'Please enter your Postal Code',
            })}
          />
          {errors.postalCode && (
            <div className="form-error-message">
              {errors.postalCode.message}
            </div>
          )}
        </div>
        <div className="country">
          <InputFeild
            type="text"
            id="country"
            label="Country"
            {...register('country', {
              required: 'Please enter your Country',
            })}
          />
          {errors.country && (
            <div className="form-error-message">{errors.country.message}</div>
          )}
        </div>
      </form>
    </div>
  );
});
export default ShippingAddress;
