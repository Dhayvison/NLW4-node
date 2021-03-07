import { SurveysUsers } from '../models/SurveysUsers';

class SurveysUsersService {
  static async create(userId: string, surveyId: string) {
    const newSurvey = new SurveysUsers(userId, surveyId);
    const created = await newSurvey.save();
    return { error: '', created };
  }
}

export { SurveysUsersService };
