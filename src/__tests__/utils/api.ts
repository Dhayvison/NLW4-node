import request from 'supertest';
import { app } from '../../app';

export const Api = request(app);
