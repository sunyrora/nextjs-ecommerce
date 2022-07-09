import Link from 'next/link';
import { useContext } from 'react';
import { Store } from '../utils/redux/Store';
import { ADD_TO_CART } from '../utils/redux/constants/cartConstants';
import Router, { useRouter } from 'next/router';

function ProductItem({ product }) {
  const { state, dispatch } = useContext(Store);
  const router = useRouter();

  function handleAddToCart(e) {
    e.preventDefault();
    dispatch({ type: ADD_TO_CART, payload: { ...product, qty: 1 } });
    router.push('/cart');
  }

  const linkTo = `/product/${product._id}`;
  return (
    <div className="card group">
      <Link href={linkTo}>
        <a>
          <img
            src={product.image}
            alt={product.name}
            className="rounded shadow"
          />
        </a>
      </Link>
      <div className="flex flex-col items-center justify-center p-2">
        <Link href={linkTo}>
          <a>
            <h2 className="text-lg">{product.name}</h2>
          </a>
        </Link>
        <p className="mb-2">{product.brand}</p>
        <p>${product.price}</p>
        <button
          className="primary-button"
          type="button"
          disabled={product.countInStock <= 0}
          onClick={handleAddToCart}
        >
          {product.countInStock <= 0 ? 'Out of Stock' : 'Add to cart'}
        </button>
      </div>
    </div>
  );
}

export default ProductItem;
