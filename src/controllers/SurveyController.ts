import { Request, Response } from 'express';
import { SurveyService } from '../services/SurveyService';

class SurveyController {
  async create(request: Request, response: Response) {
    const { title, description } = request.body;

    const result = await SurveyService.create(title, description);
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
      const result = await SurveyService.read(id);
      if (result.error) {
        return response.status(404).json({
          error: result.error,
        });
      } else {
        return response.json(result);
      }
    } else {
      return response.json(await SurveyService.readAll());
    }
  }

  async update(request: Request, response: Response) {
    const { id } = request.params;
    const { title, description } = request.body;

    const result = await SurveyService.update(id, { title, description });
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

    const result = await SurveyService.delete(id);
    if (result.error) {
      return response.status(404).json({
        error: result.error,
      });
    } else {
      return response.json(result);
    }
  }
}

export { SurveyController };
