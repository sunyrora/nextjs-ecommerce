import OderDetails from '../../containers/OderDetails';
import { getOrderById } from '../api/orders/oderController';

const OderDetailsPage = ({ order }) => {
  return <OderDetails order={order} />;
};

OderDetailsPage.auth = true;
export default OderDetailsPage;

export const getServerSideProps = async ({ query }) => {
  let { _id, order } = query;
  // console.log('getServerSideProps order: ', order);
  // console.log('getServerSideProps query: ', query);

  // if (order) order = JSON.parse(order);

  if (!order) {
    console.log('Order item from server');
    order = await getOrderById(_id);
  }

  return {
    props: { title: 'Oder Details', order },
  };
};
