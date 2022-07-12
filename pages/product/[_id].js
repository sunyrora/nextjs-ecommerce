import React from 'react';
import ProductDetails from '../../containers/ProductDetails';
import { getProductById } from '../api/products/productController';

function ProductPage({ product }) {
  return <ProductDetails product={product} />;
}

export default ProductPage;

export const getServerSideProps = async ({ params }) => {
  try {
    const productId = params._id;
    const data = await getProductById(productId);
    const product = JSON.parse(JSON.stringify(data));

    const title = product?.name ?? '';
    return {
      props: {
        title,
        product: product,
      },
    };
  } catch (error) {
    console.error('getServerSideProps:: find product by id error: ', error);
    return {
      props: {
        title: 'Product not found',
        product: null,
      },
    };
  }
};
