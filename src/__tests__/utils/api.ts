import request from 'supertest';
import { app } from '../../app';

export const api = request(app);
