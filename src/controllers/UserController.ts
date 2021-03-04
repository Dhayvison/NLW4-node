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

  async read(request: Request, response: Response) {
    const { id } = request.params;
    if (id) {
      try {
        const user = await User.findOneOrFail({ id });
        return response.json(user);
      } catch (error) {
        return response.status(404).json({
          error: 'User not found',
        });
      }
    } else {
      return response.json(await User.find());
    }
  }

  async update(request: Request, response: Response) {
    const { id } = request.params;
    const { name, email } = request.body;

    try {
      const user = await User.findOneOrFail({ id });

      if (name && email) {
        user.name = name;
        user.email = email;
        const updated = await user.save();
        return response.json(updated);
      } else {
        return response.status(400).json({ error: 'Empty name or email' });
      }
    } catch (error) {
      return response.status(404).json({
        error: 'User not found',
      });
    }
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params;

    try {
      const user = await User.findOneOrFail({ id });
      const deleted = await user.remove();
      return response.json(deleted);
    } catch (error) {
      return response.status(404).json({
        error: 'User not found',
      });
    }
  }
}

export { UserController };
