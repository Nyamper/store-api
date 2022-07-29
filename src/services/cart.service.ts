import {
  TCart,
  TCartInput,
  TCreateCartProductsInput,
  cartStatus,
  paymentStatus,
} from '../types/types';
import CartsModel from '../models/carts.model';
import PaymentsModel from '../models/payments.model';
import UsersModel from '../models/users.model';
import ProductsModel from '../models/products.model';

class CartService {
  async createCart(cart: TCartInput) {
    const user = await UsersModel.findById(cart.userId);
    const payment = new PaymentsModel();
    const newCart = new CartsModel(cart);
    payment.cartId = newCart._id;
    if (cart.products) {
      newCart.products = await this.calcPrice(cart.products);
    }
    await payment.save();
    await newCart.save();
    return newCart;
  }

  async updateCart(cart: TCartInput) {
    const newProducts = await this.calcPrice(cart.products);
    return await CartsModel.updateOne(
      { userId: cart.userId },
      { $set: { products: newProducts } }
    );
  }

  async deleteCart(cart: TCartInput) {
    const existingCart = await CartsModel.findOne({ userId: cart.userId });
    const existingPayment = await PaymentsModel.findOne({
      cartId: existingCart!._id,
    });
    if (existingCart) {
      existingCart.status = cartStatus.DELETED;
    }
    if (existingPayment) {
      existingPayment.status = paymentStatus.CANCELED;
    }
    await existingCart!.save();
    await existingPayment!.save();
    return existingCart;
  }

  async calcPrice(products: TCreateCartProductsInput[]) {
    const ids = products.map((product) => product.productId);

    const dbProducts = await ProductsModel.find({ _id: { $in: ids } });

    return dbProducts.map((prod) => {
      const product = products.find((item) => item.productId === prod.id);
      if (product) {
        return { ...product, total: product.quantity * prod.price };
      }
    });
  }
}

export default CartService;
