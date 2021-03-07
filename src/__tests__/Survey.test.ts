import { api } from './utils/api';
import { runMigrations, truncate } from './utils/database';

describe('Surveys', () => {
  const surveyExample = {
    title: 'Survey example',
    description: 'This is an example of a survey description',
  };

  beforeAll(async () => {
    await runMigrations();
  });

  afterAll(async () => {
    await truncate('Survey');
  });

  async function getOneSurveyId() {
    const surveysResponse = await api.get('/survey');
    const { id } = surveysResponse.body.surveys.pop();
    return id;
  }

  it('Register a new valid survey', async () => {
    const { status, body } = await api.post('/survey').send(surveyExample);

    expect(status).toBe(201);
    expect(body.error).toBe('');
    expect(body.created).toHaveProperty('id');
    expect(body.created).toHaveProperty('title');
    expect(body.created).toHaveProperty('description');
    expect(body.created).toHaveProperty('created_at');
  });

  it('Read all surveys', async () => {
    const { status, body } = await api.get('/survey');

    expect(status).toBe(200);
    expect(body.error).toBe('');
    expect(body.surveys).toBeInstanceOf(Array);
    expect(body.surveys.length).toBe(1);
  });

  it('Read the survey by id', async () => {
    const id = await getOneSurveyId();
    const { status, body } = await api.get(`/survey/${id}`);

    expect(status).toBe(200);
    expect(body.error).toBe('');
    expect(body.survey).toHaveProperty('id');
    expect(body.survey).toHaveProperty('title');
    expect(body.survey).toHaveProperty('description');
    expect(body.survey).toHaveProperty('created_at');
  });

  it('Return error to a non valid survey id', async () => {
    const { status, body } = await api.get(`/survey/0`);

    expect(status).toBe(404);
    expect(body.error).not.toBe('');
    expect(body).not.toHaveProperty('survey');
  });

  it('Update survey name and email', async () => {
    const id = await getOneSurveyId();
    const { status, body } = await api.put(`/survey/${id}`).send({
      title: `${surveyExample.title} updated`,
      description: `${surveyExample.description} updated`,
    });

    expect(status).toBe(200);
    expect(body.error).toBe('');
    expect(body.updated.id).toBe(id);
    expect(body.updated.title).toBe(`${surveyExample.title} updated`);
    expect(body.updated.description).toBe(
      `${surveyExample.description} updated`,
    );
  });

  it('Delete survey', async () => {
    const id = await getOneSurveyId();
    const { status, body } = await api.delete(`/survey/${id}`);

    expect(status).toBe(200);
    expect(body.error).toBe('');
    expect(body.deleted).toHaveProperty('title');
    expect(body.deleted).toHaveProperty('description');
    expect(body.deleted).toHaveProperty('created_at');
  });
});
