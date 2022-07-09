import Link from 'next/link';
import Image from 'next/image';
import { TrashIcon } from '@heroicons/react/outline';
import { useContext } from 'react';
import { Store } from '../utils/redux/Store';
import { REMOVE_FROM_CART } from '../utils/redux/constants/cartConstants';

function CartItem({ item }) {
  const { state, dispatch } = useContext(Store);

  function handleRemoveFromCart(e) {
    e.preventDefault();
    dispatch({ type: REMOVE_FROM_CART, payload: { id: item._id } });
  }

  return (
    <div className="table-row-group">
      <div className="table-row">
        <div className="table-cell cart-item-row">
          <Link href={`/product/${item._id}`}>
            <a className="flex space-x-2 items-center">
              <Image src={item.image} alt={item.name} width={50} height={50} />
              <span>{item.name}</span>
            </a>
          </Link>
        </div>
        <div className="table-cell cart-item-row">{item.qty}</div>
        <div className="table-cell cart-item-row">${item.price}</div>
        <div className="table-cell cart-item-row">
          <button onClick={handleRemoveFromCart}>
            <TrashIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
