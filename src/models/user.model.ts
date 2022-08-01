import { Schema, Types } from 'mongoose';
import { Service } from 'typedi';

import { TUser } from '../types/types';

import { modelMixIn } from '../mixins';

const userSchema = new Schema<TUser>(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
    token: { type: String },
  },
  { versionKey: false, timestamps: true }
);

@Service()
export class User extends modelMixIn<TUser>('user', userSchema) {
  async getUserById(_id: Types.ObjectId) {
    return this.model.findById(_id);
  }
}
