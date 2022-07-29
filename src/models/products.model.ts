import { Schema, model } from 'mongoose';
import { TProduct } from '../types/types';

const productsSchema = new Schema<TProduct>(
  {
    name: { type: String, require: true },
    category: { type: String, require: true },
    price: { type: Number, require: true },
  },
  { versionKey: false, timestamps: true }
);

export default model('products', productsSchema);
