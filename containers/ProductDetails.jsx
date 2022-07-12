import Link from 'next/link';
import Image from 'next/image';
import { useContext, useState } from 'react';
import { Store } from '../utils/redux/Store';
import { ADD_TO_CART } from '../utils/redux/constants/cartConstants';
import { useRouter } from 'next/router';

function ProductDetails({ product }) {
  const { state, dispatch } = useContext(Store);
  const [qty, setQty] = useState(1);
  const router = useRouter();

  function handleAddToCart(e) {
    e.preventDefault();
    dispatch({
      type: ADD_TO_CART,
      payload: {
        ...product,
        qty,
      },
    });

    router.push('/cart');
  }

  return (
    <>
      {product ? (
        <div className="py-2 space-y-2">
          <Link href="/">
            <button className="secondary-button text-sm" type="button">
              Back to List
            </button>
          </Link>

          <div className="grid md:grid-cols-4 md:gap-5">
            <div className="md:col-span-2">
              <Image
                src={product.image}
                alt={product.name}
                width={640}
                height={640}
              />
            </div>
            <div>
              <ul>
                <li>
                  <h1 className="text-lg">{product.name}</h1>
                </li>
                <li>Category: {product.category}</li>
                <li>Brand: {product.brand}</li>
                <li>
                  {product.rating} of {product.numReviews} reviews
                </li>
                <li>{product.description}</li>
              </ul>
            </div>
            <div className="card product-details-card p-5 h-fit">
              <div>
                <div>Price</div>
                <div>${product.price}</div>
              </div>
              <div>
                <div>Status</div>
                <div>
                  {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                </div>
              </div>
              <select
                className="cartitem__select"
                value={qty}
                onChange={(e) => setQty(e.target.value)}
              >
                {[...Array(product.countInStock).keys()].map((x) => (
                  <option key={x + 1} value={x + 1}>
                    {x + 1}
                  </option>
                ))}
              </select>
              <button
                disabled={product.countInStock <= 0}
                className="primary-button w-full"
                onClick={handleAddToCart}
              >
                Add to cart
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div>Product Not found</div>
      )}
    </>
  );
}

export default ProductDetails;
