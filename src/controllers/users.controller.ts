import { Request, Response } from 'express';
import UserService from '../services/user.service';

import {
  formatSuccessResponse,
  formatErrorResponse,
} from '../services/http.service';

class UsersController {
  constructor(private userService: UserService) {}
  async createUser(req: Request, res: Response) {
    try {
      const user = await this.userService.createUser(req.body);
      return formatSuccessResponse(res, user);
    } catch (error: any) {
      console.log(error);
      return formatErrorResponse(res, error);
    }
  }
}

export default UsersController;
