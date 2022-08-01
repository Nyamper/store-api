import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Document } from 'mongoose';
import { User } from '../models/user.model';
import { TUserInput, TUser } from '../types/types';

class AuthService {
  constructor(private user: User = new User()) {}
  public async loginUser(params: TUserInput) {
    const user = await this.findUserByUsername(params.username);

    if (!user) {
      throw new Error('User not found');
    }

    const isValid = await this.comparePassword(params.password, user.password);

    if (!isValid) {
      throw new Error('Invalid password');
    }

    const token = await this.generateToken(user);
    user.token = token;
    await user.save();

    return token;
  }

  public async registerUser(params: TUserInput) {
    const existedUser = await this.findUserByUsername(params.username);

    if (existedUser) {
      throw new Error('User already exists');
    }

    const hashedPassword = await this.hashPassword(params.password);
    const user = new this.user.model({
      username: params.username,
      password: hashedPassword,
    });

    await user.save();

    return user;
  }

  public async logoutUser(user: Document<unknown, any, TUser> & TUser) {
    try {
      user.token = '';
      await user.save();
      return user;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  public verifyToken(token: string): any {
    try {
      if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET is not defined');
      }
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      return decoded;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  private async findUserByUsername(username: string) {
    try {
      const user = await this.user.model.findOne({ username });
      return user;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  public async findUserById(id: string) {
    try {
      const user = await this.user.model.findById(id);
      return user;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  private async hashPassword(password: string) {
    try {
      return await bcrypt.hash(password, 10);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  private async comparePassword(password: string, hashedPassword: string) {
    try {
      return await bcrypt.compare(password, hashedPassword);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  private async generateToken(user: TUser) {
    try {
      if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET is not defined');
      }
      return await jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

export default AuthService;
