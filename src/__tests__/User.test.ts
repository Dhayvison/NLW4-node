import request from 'supertest';
import { app } from '../app';
import database from '../database';

describe('Users', () => {
  const api = request(app);
  const userExample = {
    name: 'User Example',
    email: 'user@example.com',
  };

  beforeAll(async () => {
    await (await database).runMigrations();
  });

  afterAll(async () => {
    await (await database).dropDatabase();
  });

  it('Register a new valid user', async () => {
    const { status, body } = await api.post('/users').send(userExample);

    expect(status).toBe(201);
    expect(body.error).toBe('');
    expect(body.created).toHaveProperty('id');
    expect(body.created).toHaveProperty('name');
    expect(body.created).toHaveProperty('email');
    expect(body.created).toHaveProperty('created_at');
  });

  it('Not create a user with the same email', async () => {
    const { status, body } = await api.post('/users').send(userExample);

    expect(status).toBe(409);
    expect(body.error).not.toBe('');
    expect(body).not.toHaveProperty('created');
  });

  it('Read all users', async () => {
    const { status, body } = await api.get('/users');

    expect(status).toBe(200);
    expect(body.error).toBe('');
    expect(body.users).toBeInstanceOf(Array);
    expect(body.users.length).toBe(1);
  });

  it('Read the user by id', async () => {
    const usersResponse = await api.get('/users');
    const { id } = usersResponse.body.users.pop();
    const { status, body } = await api.get(`/users/${id}`);

    expect(status).toBe(200);
    expect(body.error).toBe('');
    expect(body.user).toHaveProperty('id');
    expect(body.user).toHaveProperty('name');
    expect(body.user).toHaveProperty('email');
    expect(body.user).toHaveProperty('created_at');
  });

  it('Return error to a non valid user id', async () => {
    const { status, body } = await api.get(`/users/0`);

    expect(status).toBe(404);
    expect(body.error).not.toBe('');
    expect(body).not.toHaveProperty('user');
  });

  it('Update user name and email', async () => {
    const usersResponse = await api.get('/users');
    const { id } = usersResponse.body.users.pop();
    const { status, body } = await api.put(`/users/${id}`).send({
      name: `${userExample.name} Updated`,
      email: `${userExample.email}.update`,
    });

    expect(status).toBe(200);
    expect(body.error).toBe('');
    expect(body.updated.id).toBe(id);
    expect(body.updated.name).toBe(`${userExample.name} Updated`);
    expect(body.updated.email).toBe(`${userExample.email}.update`);
  });

  it.todo('Delete user');
});
