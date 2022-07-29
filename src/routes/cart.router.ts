import express = require('express');

import CartsController from '../controllers/carts.controller';
import CartSetvice from '../services/cart.service';

const router = express.Router();

const cartController = new CartsController(new CartSetvice());

router.post('/', cartController.createCart.bind(cartController));
router.patch('/:id', cartController.addProductsToCart.bind(cartController));
router.patch(
  '/:id',
  cartController.removeProductsFromCart.bind(cartController)
);

export default router;
