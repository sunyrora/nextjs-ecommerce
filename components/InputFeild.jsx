import { forwardRef } from 'react';

const InputFeild = forwardRef(
  (
    {
      type,
      id,
      label,
      name,
      placeholder = 'pace holder',
      autoFocus = false,
      ...rest
    },
    ref
  ) => {
    return (
      <div className="relative ">
        <input
          type={type}
          ref={ref}
          id={id}
          name={name}
          className="peer h-10 mt-10 w-full border-b-2 border-gray-300 text-gray-900            
            placeholder-transparent 
            focus:outline-2 focus:border-indigo-600"
          placeholder={placeholder}
          {...rest}
          autoFocus={autoFocus}
        />
        <label
          htmlFor={id}
          className="absolute left-0 top-1 text-indigo-600 text-sm transition-all 
              peer-placeholder-shown:text-base 
              peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-8
               peer-focus:top-1 peer-focus:text-gray-600 peer-focus:text-sm"
        >
          {label}
        </label>
      </div>
    );
  }
);
InputFeild.displayName = 'InputFeild';
export default InputFeild;
