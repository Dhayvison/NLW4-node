import { Request, Response } from 'express';
import { SendMailService } from '../services/SendMailService';
import { SurveyService } from '../services/SurveyService';
import { SurveysUsersService } from '../services/SurveysUsersService';
import { UserService } from '../services/UserService';

class SurveyUserController {
  async sendSurvey(request: Request, response: Response) {
    const { userId, surveyId } = request.body;

    const surveyUser = await SurveysUsersService.getSurveyToSend(
      userId,
      surveyId,
    );

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

    const baseUrl = request.protocol + '://' + request.get('host');

    const info = await SendMailService.send(
      survey.survey.title,
      user.user.email,
      'NPSMail',
      {
        name: user.user.name,
        title: survey.survey.title,
        description: survey.survey.description,
        urlToAnswers: `${baseUrl}/answer/${surveyUser.id}`,
      },
    );

    if (info.mailInfo.rejected.length) {
      return response.status(409).json({
        error: info.mailInfo.response,
      });
    } else {
      return response.status(201).json({ ...surveyUser, info });
    }
  }
}

export { SurveyUserController };
