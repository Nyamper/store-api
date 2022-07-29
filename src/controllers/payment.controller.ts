import { Request, Response } from 'express';
import PaymentService from '../services/payment.service';

class PaymentController {
  constructor(private paymentService: PaymentService) {}
  async payForCart(req: Request, res: Response) {
    const payment = await this.paymentService.changeStatus(req.body);
  }
  async deleteCart(req: Request, res: Response) {}
}
export default PaymentController;
