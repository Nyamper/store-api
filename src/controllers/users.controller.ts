import { Request, Response } from 'express';
import UserService from '../services/user.service';
import HttpController from './http.controlle';

class UsersController extends HttpController {
  constructor(private userService: UserService) {
    super();
  }
  async createUser(req: Request, res: Response) {
    try {
      const user = await this.userService.createUser(req.body);
      return this.formatSuccessResponse(res, user);
    } catch (error: any) {
      console.log(error);
      return this.formatErrorResponse(res, error);
    }
  }
}

export default UsersController;
