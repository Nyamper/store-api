import express from 'express';

import users from './users.router';
import products from './products.router';
import cart from './cart.router';
import payment from './payment.router';

const router = express.Router();

router.use('/users', users);
router.use('/products', products);
router.use('/cart', cart);
router.use('/payment', payment);

export default router;
