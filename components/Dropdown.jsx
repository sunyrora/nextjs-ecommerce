import Link from 'next/link';
import { useState } from 'react';
import DetectOutside from '../containers/DetectOutside';

function Dropdown({ data }) {
  const { label, items } = data;
  const [showDropMenu, setShowDropMenu] = useState(false);
  return (
    <DetectOutside onClickOutside={setShowDropMenu}>
      <div className="relative">
        {/* <!-- Dropdown toggle button --> */}
        <button
          onClick={(e) => setShowDropMenu(!showDropMenu)}
          className="secondary-button flex items-center"
        >
          {label}
        </button>
        {/* Dropdown list */}
        <div
          className={`${
            !showDropMenu && 'hidden'
          } absolute right-0 py-2 mt-1 bg-white bg-stone-200 rounded-md shadow-xl w-fit`}
        >
          {items?.map((item) => (
            <button
              key={item.label}
              onClick={item.handleOnClick}
              className="block text-sm text-left text-gray-700 hover:bg-stone-500 hover:text-white"
            >
              {item.label}
            </button>
          ))}
          {/* <Link href="#"> */}
          {/* <button className="block text-sm text-gray-700 hover:bg-stone-500 hover:text-white">
            Dropdown List 1
          </button> */}
          {/* </Link> */}
        </div>
      </div>
    </DetectOutside>
  );
}

export default Dropdown;
