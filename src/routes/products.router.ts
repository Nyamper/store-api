import express = require('express');

import ProductsController from '../controllers/products.controller';
import ProductsService from '../services/products.service';

const router = express.Router();

const productController = new ProductsController(new ProductsService());

router.post('/', productController.createProduct.bind(productController));

export default router;
