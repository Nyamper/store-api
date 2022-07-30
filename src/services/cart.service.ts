import {
  TCartInput,
  TCreateCartProductsInput,
  cartStatus,
  paymentStatus,
} from '../types/types';
import { Cart } from '../models/carts.model';
import { Payment } from '../models/payments.model';
import { User } from '../models/users.model';
import { Product } from '../models/products.model';

class CartService {
  constructor(
    private cart: Cart = new Cart(),
    private user: User = new User(),
    private product: Product = new Product(),
    private payment: Payment = new Payment()
  ) {}

  async createCart(cart: TCartInput) {
    const user = await this.user.model.findById(cart.userId);

    if (!user) {
      return new Error('user not exist');
    }

    const payment = new this.payment.model();
    const newCart = new this.cart.model(cart);

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
    return await this.cart.model.updateOne(
      { userId: cart.userId },
      { $set: { products: newProducts } }
    );
  }

  async deleteCart(cart: TCartInput) {
    const existingCart = await this.cart.model.findOne({ userId: cart.userId });
    const existingPayment = await this.payment.model.findOne({
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

    const dbProducts = await this.product.model.find({ _id: { $in: ids } });

    return dbProducts.map((prod) => {
      const product = products.find((item) => item.productId === prod.id);
      if (product) {
        return { ...product, total: product.quantity * prod.price };
      }
    });
  }
}

export default CartService;
