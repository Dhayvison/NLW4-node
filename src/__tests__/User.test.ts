import request from 'supertest';
import { app } from '../app';
import database from '../database';

describe('Users', () => {
  const api = request(app);

  beforeAll(async () => {
    await (await database).runMigrations();
  });

  afterAll(async () => {
    await (await database).dropDatabase();
  });

  it('Should register a new valid user', async () => {
    const { status } = await api.post('/users').send({
      name: 'User Example',
      email: 'user@example.com',
    });

    expect(status).toBe(201);
  });

  it('Should not create a user with the same email', async () => {
    const { status } = await api.post('/users').send({
      name: 'User Example',
      email: 'user@example.com',
    });

    expect(status).toBe(409);
  });
});
