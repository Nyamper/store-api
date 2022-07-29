import PaymentsModel from '../models/payments.model';
import CartsModel from '../models/carts.model';
import { TCart, TCartInput, cartStatus, paymentStatus } from '../types/types';

class PaymentService {
  async changeStatus(cart: TCartInput) {
    const currentCart = await CartsModel.findOne({ userId: cart.userId });
    const currentPayment = await PaymentsModel.findOne({
      cartId: currentCart!._id,
    });

    if (currentPayment) {
      currentPayment.status = paymentStatus.DONE;
    }
    if (currentCart) {
      currentCart.status = cartStatus.PAYED;
    }
    await currentCart!.save();
    await currentPayment!.save();
  }
}

export default PaymentService;
