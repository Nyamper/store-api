import { Schema, model } from 'mongoose';

import { cartStatus, TCart, TProductInCart } from '../types/types';

const cartProductsArraySchema = new Schema<TProductInCart>({
  productId: { type: Schema.Types.ObjectId, ref: 'products', require: true },
  quantity: { type: Number, require: true },
  total: { type: Number, require: true },
});

const cartsSchema = new Schema<TCart>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'users', required: true },
    products: [cartProductsArraySchema],
    status: {
      type: String,
      require: false,
      enum: [cartStatus.ACTIVE, cartStatus.PAYED, cartStatus.DELETED],
      default: cartStatus.ACTIVE,
    },
  },
  { versionKey: false, timestamps: true }
);

export default model('carts', cartsSchema);
