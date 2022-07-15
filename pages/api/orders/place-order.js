import { unstable_getServerSession } from 'next-auth/next';

import { LOGIN_REQUIRED } from '../../../utils/constants/errorMessages';
import { authOptions } from '../auth/[...nextauth]';
import { placeOrder } from './oderController';

const handler = async (req, res) => {
  const session = await unstable_getServerSession(req, res, authOptions);

  console.log('session: ', session);
  if (session) {
    // Signed in
    // console.log('Session', JSON.stringify(session, null, 2));
    const { user } = session;

    const result = await placeOrder({ userId: user._id, order: req.body });

    res.status(201).json(result);
  } else {
    // Not Signed in
    res.status(401).send(LOGIN_REQUIRED);
  }
};

export default handler;
