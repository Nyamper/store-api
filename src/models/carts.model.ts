import { Schema, Types } from 'mongoose';

import { modelMixIn } from '../mixins';

import { cartStatus, TCart, TProductInCart } from '../types/types';

const cartProductsArraySchema = new Schema<TProductInCart>({
  productId: { type: Types.ObjectId, ref: 'products', require: true },
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

export class Cart extends modelMixIn<TCart>('carts', cartsSchema) {
  async setStatusPayed(_id: Types.ObjectId) {
    return this.model.findByIdAndUpdate(_id, { status: cartStatus.PAYED });
  }
}
