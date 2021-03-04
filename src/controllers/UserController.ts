import { Request, Response } from 'express';

class UserController {
  async create(req: Request, res: Response) {
    return res.json(req.body);
  }
}

export { UserController };
