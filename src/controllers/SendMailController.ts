import { Request, Response } from 'express';
import { SurveyService } from '../services/SurveyService';
import { SurveysUsersService } from '../services/SurveysUsersService';
import { UserService } from '../services/UserService';

class SendMailController {
  async sendMail(request: Request, response: Response) {
    const { userId, surveyId } = request.body;

    const user = await UserService.read(userId);
    if (user.error) {
      return response.status(404).json({
        error: user.error,
      });
    }

    const survey = await SurveyService.read(surveyId);
    if (survey.error) {
      return response.status(404).json({
        error: survey.error,
      });
    }

    const result = await SurveysUsersService.create(userId, surveyId);
    if (result.error) {
      return response.status(409).json({
        error: result.error,
      });
    } else {
      return response.status(201).json(result);
    }
  }
}

export { SendMailController };
