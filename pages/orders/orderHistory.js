import { unstable_getServerSession } from 'next-auth';
import OrderHistory from '../../containers/OrderHistory';
import { authOptions } from '../api/auth/[...nextauth]';
import { getOrders } from '../api/orders/oderController';

const OrderHistoryPage = ({ orders }) => {
  return <OrderHistory orders={orders} />;
};

OrderHistoryPage.auth = true;
export default OrderHistoryPage;

export const getServerSideProps = async ({ req, res, query }) => {
  let { userId } = query;

  if (!userId) {
    const session = await unstable_getServerSession(req, res, authOptions);
    userId = session?.user?._id;
  }

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
    return {
      props: {
        title: 'Order History',
        orders: [],
      },
    };
  }
};
