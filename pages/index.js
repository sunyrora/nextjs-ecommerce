import ProductList from '../containers/ProductList';
import { getProducts } from './api/products/productController';

export default function Home({ products }) {
  return <ProductList products={products} />;
}

export const getServerSideProps = async () => {
  try {
    const products = await getProducts();
    return {
      props: {
        title: 'Home',
        products: JSON.parse(JSON.stringify(products)),
      },
    };
  } catch (error) {
    console.error('find products error: ', error);
    throw error;
  }
};
