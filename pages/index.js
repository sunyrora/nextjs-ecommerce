import ProductList from '../containers/ProductList';
import connectDB, { disconnectDB } from '../db/config';
import Product from '../db/models/Product';

export default function Home({ products }) {
  return <ProductList products={products} />;
}

export const getServerSideProps = async () => {
  try {
    await connectDB();
    const products = await Product.find().lean();
    await disconnectDB();

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
