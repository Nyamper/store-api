import { Schema, model } from 'mongoose';

import { paymentStatus } from '../types/types';

const paymentsSchema = new Schema(
  {
    cartId: {
      type: Schema.Types.ObjectId,
      ref: 'carts',
    },
    status: {
      type: String,
      require: true,
      enum: [paymentStatus.CREATED, paymentStatus.DONE, paymentStatus.CANCELED],
      default: paymentStatus.CREATED,
    },
  },

  { versionKey: false, timestamps: true }
);

export default model('payments', paymentsSchema);
