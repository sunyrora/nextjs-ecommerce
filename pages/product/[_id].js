import React from 'react';
import ProductDetails from '../../containers/ProductDetails';
import connectDB, { disconnectDB } from '../../db/config';
import Product from '../../db/models/Product';

function ProductPage({ product }) {
  return <ProductDetails product={product} />;
}

export default ProductPage;

export const getServerSideProps = async (context) => {
  try {
    const productId = context.params._id;
    await connectDB();
    const product = await Product.findById(productId).lean();
    await disconnectDB();

    const title = product?.name ?? '';
    return {
      props: {
        title,
        product: JSON.parse(JSON.stringify(product)),
      },
    };
  } catch (error) {
    console.error('find product by id error: ', error);
    return {
      props: {
        title: 'Product not found',
        product: null,
      },
    };
  }
};
