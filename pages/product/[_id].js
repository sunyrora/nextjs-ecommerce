import { useRouter } from 'next/router';
import React from 'react';
import ProductDetails from '../../containers/ProductDetails';

import sampleData from '../../utils/sampleData';

function ProductPage({ product }) {
  const { query } = useRouter();
  return <ProductDetails product={product} />;
}

export default ProductPage;

export const getServerSideProps = async (context) => {
  const product = sampleData.products.find(
    (product) => product._id === context.params._id
  );

  const title = product?.name ?? '';
  return {
    props: {
      title,
      product,
    },
  };
};
