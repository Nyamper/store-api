import { TUser } from '../types/types';
import UserModel from '../models/users.model';

class UserService {
  async createUser(user: TUser) {
    const newUser = new UserModel(user);
    await newUser.save();
    return newUser;
  }
}

export default UserService;
