import express = require('express');

import PaymentController from '../controllers/payment.controller';
import PaymentService from '../services/payment.service';

const router = express.Router();

const paymentController = new PaymentController(new PaymentService());

router.patch('/:id', paymentController.payForCart.bind(paymentController));

export default router;
