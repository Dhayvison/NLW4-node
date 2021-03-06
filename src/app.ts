import 'dotenv/config';
import 'reflect-metadata';
import cors from 'cors';
import express from 'express';
import { router } from './routes';
import './database';

const app = express();
app.use(cors());
app.use(express.json());
app.disable('x-powered-by');

app.get('/', (...[, response]) => {
  return response.json({ status: 'running' });
});

app.use(router);

export { app };
