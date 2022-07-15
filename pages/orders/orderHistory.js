import OrderHistory from '../../containers/OrderHistory';
import { getOrders } from '../api/orders/oderController';

const OrderHistoryPage = ({ orders }) => {
  return <OrderHistory orders={orders} />;
};

OrderHistoryPage.auth = true;
export default OrderHistoryPage;

export const getServerSideProps = async ({ query }) => {
  const { userId } = query;

  try {
    const orders = await getOrders(userId);
    return {
      props: {
        title: 'Order History',
        orders: orders,
      },
    };
  } catch (error) {
    console.log('getOrders error: ', error);
  }
};
