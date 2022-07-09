import CartList from '../containers/CartList';

function CartPage() {
  return <CartList />;
}

export default CartPage;

export const getStaticProps = async () => {
  return {
    props: {
      title: 'Shopping Cart',
    },
  };
};
