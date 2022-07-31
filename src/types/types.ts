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

export type TPayment = {
  cartId: Types.ObjectId;
  status: paymentStatus;
};

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

// export type TUser = {
//   name: string;
//   email: string;
// };

export type TCreateCartProductsInput = {
  productId: Types.ObjectId;
  quantity: number;
};

export type TCartInput = {
  userId: Types.ObjectId;
  products: TCreateCartProductsInput[];
};

export type TUserInput = {
  username: string;
  password: string;
};

export type TUser = {
  _id?: string;
  username: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
  token?: string;
};

export type TContext = {
  token?: string;
  user?: TUser;
};
