import { Request, Response } from 'express';
import ProductsService from '../services/products.service';

import {
  formatSuccessResponse,
  formatErrorResponse,
} from '../services/http.service';

class ProductsController {
  constructor(private productsService: ProductsService) {}
  async createProduct(req: Request, res: Response) {
    try {
      const product = await this.productsService.addProducts(req.body);
      return formatSuccessResponse(res, product);
    } catch (error: any) {
      console.log(error);
      return formatErrorResponse(res, error);
    }
  }
}

export default ProductsController;
