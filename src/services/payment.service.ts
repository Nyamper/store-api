import { Payment } from '../models/payments.model';
import { Cart } from '../models/carts.model';
import { TCartInput } from '../types/types';

class PaymentService {
  constructor(
    private cart: Cart = new Cart(),
    private payment: Payment = new Payment()
  ) {}
  async changeStatus(cart: TCartInput) {
    const currentCart = await this.cart.model.findOne({
      userId: cart.userId,
    });
    const currentPayment = await this.payment.model.findOne({
      cartId: currentCart!._id,
    });

    if (currentCart && currentPayment) {
      this.payment.setPaymentToDone(currentPayment._id);
      this.cart.setStatusPayed(currentCart._id);
    }

    await currentCart!.save();
    await currentPayment!.save();
  }
}

export default PaymentService;
