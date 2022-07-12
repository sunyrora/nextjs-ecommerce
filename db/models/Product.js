import { Schema, model, models } from 'mongoose';

const ProductSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a product name'],
    },
    slug: {
      type: String,
      requried: true,
      unique: true,
    },
    category: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    brand: { type: String, required: true },
    rating: { type: Number, required: true, default: 0 },
    numReviews: { type: Number, required: true, default: 0 },
    countInStock: {
      type: Number,
      required: [true, 'Please provide the number of produts in stock'],
      default: 0,
    },
    description: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Product = models.Products || model('Products', ProductSchema);
export default Product;
