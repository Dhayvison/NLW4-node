import { SurveysUsers } from '../models/SurveysUsers';

class SurveysUsersService {
  static async create(userId: string, surveyId: string) {
    const newSurvey = new SurveysUsers(userId, surveyId);
    const created = await newSurvey.save();
    return { error: '', created };
  }

  static async read(id: string) {
    try {
      const surveyUser = await SurveysUsers.findOneOrFail({ id });
      return { error: '', surveyUser };
    } catch (error) {
      return { error: 'Survey to this User not found' };
    }
  }

  static async update(id: string, { grade }: { grade: string }) {
    const result = await this.read(id);
    if (result.error) {
      return {
        error: result.error,
      };
    }
    const { surveyUser } = result;
    surveyUser.value = Number(grade);
    const updated = await surveyUser.save();
    return { error: '', updated };
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
