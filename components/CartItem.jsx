import Link from 'next/link';
import Image from 'next/image';
import { TrashIcon } from '@heroicons/react/outline';
import { round2 } from '../utils/utils';

function CartItem({ item, onRemoveFromCart = null, onQtyChange = null }) {
  const subTotal = round2(item.price * item.qty);
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
        <div className="table-cell cart-item-row">
          {onQtyChange ? (
            <select
              className="cartitem__select"
              value={item.qty}
              onChange={(e) => onQtyChange(item._id, e.target.value)}
            >
              {[...Array(item.countInStock).keys()].map((x) => (
                <option key={x + 1} value={x + 1}>
                  {x + 1}
                </option>
              ))}
            </select>
          ) : (
            <div>{item.qty}</div>
          )}
        </div>
        {onRemoveFromCart ? (
          <>
            <div className="table-cell cart-item-row">
              <p>${subTotal}</p>
              <p>({item.price} / unit)</p>
            </div>
            <div className="table-cell cart-item-row">
              <button onClick={(e) => onRemoveFromCart(item._id)}>
                <TrashIcon className="h-5 w-5" />
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="table-cell cart-item-row">${item.price}</div>
            <div className="table-cell cart-item-row">${subTotal}</div>
          </>
        )}
      </div>
    </div>
  );
}

export default CartItem;
