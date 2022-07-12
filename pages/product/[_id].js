import React from 'react';
import ProductDetails from '../../containers/ProductDetails';
import connectDB, { disconnectDB } from '../../db/config';
import Product from '../../db/models/Product';
import { getProductById } from '../api/products/[_id]';

function ProductPage({ product }) {
  return <ProductDetails product={product} />;
}

export default ProductPage;

export const getServerSideProps = async ({ req, res, params }) => {
  const debug = 1;

  if (debug) {
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
  } else {
    try {
      const productId = params._id;
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
  }

  // return {
  //   props: {
  //     title: 'Product not found',
  //     product: null,
  //   },
  // };
};
