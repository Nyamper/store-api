import { Schema, Types, model } from 'mongoose';

import { modelMixIn } from '../mixins';

import { TUser } from '../types/types';

const usersSchema = new Schema<TUser>(
  {
    name: { type: String, require: true },
    email: { type: String, require: true },
  },
  { versionKey: false, timestamps: true }
);

export class User extends modelMixIn<TUser>('users', usersSchema) {
  async getUserById(_id: Types.ObjectId) {
    return this.model.findById(_id);
  }
}
