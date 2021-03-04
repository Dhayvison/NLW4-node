import { Request, Response } from 'express';
import { UserService } from '../services/UserService';

class UserController {
  async create(request: Request, response: Response) {
    const { name, email } = request.body;

    const result = await UserService.create(name, email);
    if (result.error) {
      return response.status(409).json({
        error: result.error,
      });
    } else {
      return response.status(201).json(result);
    }
  }

  async read(request: Request, response: Response) {
    const { id } = request.params;

    if (id) {
      const result = await UserService.read(id);
      if (result.error) {
        return response.status(404).json({
          error: result.error,
        });
      } else {
        return response.json(result);
      }
    } else {
      return response.json(await UserService.readAll());
    }
  }

  async update(request: Request, response: Response) {
    const { id } = request.params;
    const { name, email } = request.body;

    const result = await UserService.update(id, { name, email });
    if (result.error) {
      return response.status(404).json({
        error: result.error,
      });
    } else {
      return response.json(result);
    }
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params;

    const result = await UserService.delete(id);
    if (result.error) {
      return response.status(404).json({
        error: result.error,
      });
    } else {
      return response.json(result);
    }
  }
}

export { UserController };
