import { Survey } from '../models/Survey';

class SurveyService {
  static async create(title: string, description: string) {
    const newSurvey = new Survey(title, description);
    const created = await newSurvey.save();
    return { error: '', created };
  }

  static async read(id: string) {
    try {
      const survey = await Survey.findOneOrFail({ id });
      return { error: '', survey };
    } catch (error) {
      return { error: 'Survey not found' };
    }
  }

  static async readAll() {
    const surveys = await Survey.find();
    return { error: '', surveys };
  }

  static async update(
    id: string,
    { title, description }: { title: string; description: string },
  ) {
    const result = await this.read(id);
    if (result.error) {
      return {
        error: result.error,
      };
    } else if (title && description) {
      const { survey } = result;
      survey.title = title;
      survey.description = description;
      const updated = await survey.save();
      return { error: '', updated };
    } else {
      return { error: 'Empty title or description' };
    }
  }

  static async delete(id: string) {
    const result = await this.read(id);
    if (result.error) {
      return {
        error: result.error,
      };
    } else {
      const { survey } = result;
      const deleted = await survey.remove();
      return { error: '', deleted };
    }
  }
}

export { SurveyService };
