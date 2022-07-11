import Shipping from '../containers/Shipping';

function ShippingPage() {
  return <Shipping />;
}

export default ShippingPage;

export const getStaticProps = async () => {
  return {
    props: {
      title: 'Shipping',
    },
  };
};
