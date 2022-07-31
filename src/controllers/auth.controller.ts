import { Request, Response } from 'express';

import { Service, Container } from 'typedi';

import AuthService from '../services/auth.service';
import HttpController from './http.controlle';

@Service()
export class AuthController extends HttpController {
  constructor(private authService: AuthService) {
    super();
  }
  async registerUser(req: Request, res: Response) {
    try {
      const user = await this.authService.registerUser(req.body);
      return this.formatSuccessResponse(res, user);
    } catch (error) {
      console.log(error);
      return this.formatErrorResponse(res, error);
    }
  }

  async login(req: Request, res: Response) {
    try {
      const token = await this.authService.loginUser(req.body);
      return this.formatSuccessResponse(res, token);
    } catch (error) {
      console.log(error);
      return this.formatErrorResponse(res, error);
    }
  }

  async logout(req: Request, res: Response) {
    try {
      const user = await this.authService.logoutUser(req.body);
      return this.formatSuccessResponse(res, user);
    } catch (error) {
      return this.formatErrorResponse(res, error);
    }
  }
}

export const controller = Container.get(AuthController);

export default AuthController;
