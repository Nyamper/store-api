import { Request, Response } from 'express';
import ProductsService from '../services/products.service';
import HttpController from './http.controlle';

class ProductsController extends HttpController {
  constructor(private productsService: ProductsService) {
    super();
  }
  async createProduct(req: Request, res: Response) {
    try {
      const product = await this.productsService.addProducts(req.body);
      return this.formatSuccessResponse(res, product);
    } catch (error: any) {
      console.log(error);
      return this.formatErrorResponse(res, error);
    }
  }
}

export default ProductsController;
