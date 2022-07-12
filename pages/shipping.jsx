import Shipping from '../containers/Shipping';

function ShippingPage() {
  return <Shipping />;
}
ShippingPage.auth = true;

export default ShippingPage;

export const getStaticProps = async () => {
  return {
    props: {
      title: 'Shipping',
    },
  };
};
