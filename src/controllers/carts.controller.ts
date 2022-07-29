import { Request, Response } from 'express';
import CartService from '../services/cart.service';
import HttpController from './http.controlle';

class CartsController extends HttpController {
  constructor(private cartService: CartService) {
    super();
  }
  async createCart(req: Request, res: Response) {
    try {
      const cart = await this.cartService.createCart(req.body);
      return this.formatSuccessResponse(res, cart);
    } catch (error: any) {
      console.log(error);
      return this.formatErrorResponse(res, error);
    }
  }

  async addProductsToCart(req: Request, res: Response) {
    try {
      const cart = await this.cartService.updateCart(req.body);
      return this.formatSuccessResponse(res, cart);
    } catch (error: any) {
      return this.formatErrorResponse(res, error);
    }
  }

  async removeProductsFromCart(req: Request, res: Response) {
    try {
      const cart = await this.cartService.deleteCart(req.body);
      return this.formatSuccessResponse(res, cart);
    } catch (error: any) {
      return this.formatErrorResponse(res, error);
    }
  }
}

export default CartsController;
