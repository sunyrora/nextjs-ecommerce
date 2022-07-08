const { default: ProductItem } = require('../components/ProductItem');

function ProductList({ products }) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
      {products?.map((product) => (
        <ProductItem key={product._id} product={product} />
      ))}
    </div>
  );
}

export default ProductList;
