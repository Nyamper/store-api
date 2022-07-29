import { Types } from 'mongoose';

export enum cartStatus {
  ACTIVE = 'active',
  PAYED = 'payed',
  DELETED = 'deleted',
}

export enum paymentStatus {
  CREATED = 'created',
  DONE = 'done',
  CANCELED = 'canceled',
}

export type TProduct = {
  _id: Types.ObjectId;
  name: string;
  category: string;
  price: number;
};
export type TProductInCart =
  | {
      productId: Types.ObjectId;
      quantity: number;
      total: number;
    }
  | undefined;
export type TCart = {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  products: TProductInCart[];
  status: string;
};

export type TUser = {
  name: string;
  email: string;
};

export type TCreateCartProductsInput = {
  productId: Types.ObjectId;
  quantity: number;
};

export type TCartInput = {
  userId: Types.ObjectId;
  products: TCreateCartProductsInput[];
};
