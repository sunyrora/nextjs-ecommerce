import connectDB, { disconnectDB } from '../../../db/config';
import User from '../../../db/models/Users';
import { ERROR_USER_EXIST } from '../../../utils/redux/constants/errorMessages';

/**
 *
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */
export default async function registerUser(req, res) {
  console.log('registerUser: req.body  ', req.body);
  if (req.method !== 'POST') {
    res.status(500).json({ success: false, error: 'Invalid request' });
    return;
  }

  const { username, email, password } = req.body;

  if (
    !username ||
    !email ||
    !email.includes('@') ||
    !password ||
    password.trim().length < 6
  ) {
    res.status(422).json({
      success: false,
      error: 'Validation error',
    });
    return;
  }

  try {
    await connectDB();

    const exist = await User.findOne({ email });
    if (exist) {
      res.status(422).json({
        success: false,
        error: ERROR_USER_EXIST,
      });

      await disconnectDB();

      return;
    }

    const user = await User.create({
      username,
      email,
      password,
      isAdmin: false,
    });

    res.status(201).json({
      success: true,
      message: 'User created',
      user,
    });
  } catch (error) {
    console.log('error occured: ', error.message);
    res.status(error.statusCode || 500).json({
      success: false,
      error: { error } || 'Server Error',
    });
  }
}
