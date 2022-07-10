import { useEffect, useRef } from 'react';

function DetectOutside({ onClickOutside, children }) {
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        onClickOutside && onClickOutside();
      }
    };
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, [onClickOutside]);

  return (
    <div ref={ref} className="">
      {children}
    </div>
  );
}

export default DetectOutside;
