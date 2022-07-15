import connectDB, { disconnectDB } from '../../../db/config';
import Order from '../../../db/models/Order';
import Product from '../../../db/models/Product';

export const placeOrder = async ({ userId, order }) => {
  await connectDB();
  const newOrder = await Order.create({
    ...order,
    user: userId,
  });

  await disconnectDB();

  return JSON.parse(JSON.stringify(newOrder));
};

export const getOrders = async (userId) => {
  await connectDB();

  const filter = { user: userId };
  const orders = await Order.find(filter).lean();

  await disconnectDB();

  return JSON.parse(JSON.stringify(orders));
};

export const getOrderById = async (orderId) => {
  await connectDB();
  const order = await Order.findById(orderId).lean();
  await disconnectDB();

  return JSON.parse(JSON.stringify(order));
};

export const updateCountInStock = async ({ items }) => {
  try {
    await connectDB();

    const productsPromises = items.map((item) =>
      Product.findById(item._id).then((product) => {
        product.countInStock = product.countInStock - item.qty;
        return product.save();
      })
    );

    const res = await Promise.all(productsPromises);

    await disconnectDB();

    return JSON.parse(JSON.stringify(res));
  } catch (error) {
    console.log('updateCountInStock error: ', error);
    await disconnectDB();
  }
};
