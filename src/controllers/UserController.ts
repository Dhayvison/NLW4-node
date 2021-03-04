import { Request, Response } from 'express';
import { User } from '../models/User';

class UserController {
  async create(request: Request, response: Response) {
    const { name, email } = request.body;

    const emailAlreadyExists = await User.findOne({ email });
    if (emailAlreadyExists) {
      return response.status(409).json({
        error: 'User already exists',
      });
    }

    const newUser = new User(name, email);
    const saved = await newUser.save();
    return response.status(201).json({ user: saved });
  }
}

export { UserController };
