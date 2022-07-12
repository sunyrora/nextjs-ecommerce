import connectDB, { disconnectDB } from '../../../db/config';
import Product from '../../../db/models/Product';

export const getProducts = async () => {
  await connectDB();
  const products = await Product.find({}).lean();
  await disconnectDB();

  return products;
};

export const getProductById = async (_id) => {
  await connectDB();
  // const product = await Product.findOne({ _id }).lean();
  const product = await Product.findById(_id).lean();

  await disconnectDB();

  return product;
};
