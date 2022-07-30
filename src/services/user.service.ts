import { TUser } from '../types/types';
import { User } from '../models/users.model';

class UserService {
  constructor(private user: User = new User()) {}
  async createUser(user: TUser) {
    const newUser = new this.user.model(user);
    return await newUser.save();
  }
}

export default UserService;
