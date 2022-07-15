import { unstable_getServerSession } from 'next-auth/next';
import connectDB from '../../../db/config';
import { LOGIN_REQUIRED } from '../../../utils/constants/errorMessages';
import { authOptions } from '../auth/[...nextauth]';

export const placeOrder = async ({ userId, order }) => {
//   const data = { orderId: 'orderId-1234556' };

//   console.log('userId, order ', userId, order);

  await connectDB();
  const newOrder =

  return data;
};

const handler = async (req, res) => {
  const session = await unstable_getServerSession(req, res, authOptions);
  if (session) {
    // Signed in
    // console.log('Session', JSON.stringify(session, null, 2));
    const { user } = session;

    const result = await placeOrder({ userId: user._id, order: req.body });

    res.status(200).json(result);
  } else {
    // Not Signed in
    res.status(401).send(LOGIN_REQUIRED);
  }
};

export default handler;
