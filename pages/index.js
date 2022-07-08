import Layout from '../containers/Layout';
import ProductList from '../containers/ProductList';
import sampleData from '../utils/sampleData';

export default function Home({ products }) {
  return <ProductList products={products} />;
}

export const getStaticProps = async () => {
  return {
    props: {
      title: 'Home',
      products: sampleData.products,
    },
  };
};
