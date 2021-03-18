import { SurveysUsers } from '../models/SurveysUsers';

class SurveysUsersService {
  static async create(userId: string, surveyId: string) {
    const newSurvey = new SurveysUsers(userId, surveyId);
    const created = await newSurvey.save();
    return { error: '', created };
  }

  static async getSurveyToSend(userId: string, surveyId: string) {
    const surveyUser = await SurveysUsers.findOne({
      user_id: userId,
      survey_id: surveyId,
    });

    if (!surveyUser) {
      const newSurvey = new SurveysUsers(userId, surveyId);
      return await newSurvey.save();
    }

    return surveyUser;
  }
}

export { SurveysUsersService };
