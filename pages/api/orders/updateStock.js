import { updateCountInStock } from './oderController';

const handler = async (req, res) => {
  const result = await updateCountInStock(req.body);

  //   console.log('update result: ', result);

  return res.status(200).json({ res: result.length });
};

export default handler;
