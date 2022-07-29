import { Schema, model } from 'mongoose';

const usersSchema = new Schema(
  {
    name: { type: String, require: true },
    email: { type: String, require: true },
  },
  { versionKey: false, timestamps: true }
);

export default model('users', usersSchema);
