import { Schema, Types } from 'mongoose';

import { modelMixIn } from '../mixins';

import { paymentStatus, TPayment } from '../types/types';

const paymentsSchema = new Schema<TPayment>(
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

export class Payment extends modelMixIn<TPayment>('payments', paymentsSchema) {
  async setPaymentToDone(_id: Types.ObjectId) {
    return await this.model.findByIdAndUpdate(_id, {
      status: paymentStatus.DONE,
    });
  }
}
