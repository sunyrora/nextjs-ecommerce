import Link from 'next/link';
import Image from 'next/image';

function ProductDetails({ product }) {
  return (
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
            <div>{product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}</div>
          </div>
          <button
            disabled={product.countInStock <= 0}
            className="primary-button w-full"
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
