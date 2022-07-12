import { isValidObjectId } from 'mongoose';
import { getProductById } from './productController';

/**
 *
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */
export default async function handler(req, res) {
  try {
    const productId = req.query._id;

    if (!isValidObjectId(productId)) {
      res.status({
        success: false,
        error: { message: 'Product not found (Invalid id)' },
      });
      return;
    }

    const product = await getProductById(productId);

    res.status(201).json({
      success: true,
      message: 'Found product',
      product,
    });
  } catch (error) {
    console.log('getProductById error: ', error.message);
    res.status(error.statusCode || 500).json({
      success: false,
      erorr: { error } || 'Server Error',
    });
  }
}
