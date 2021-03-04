import 'dotenv/config';
import 'reflect-metadata';
import cors from 'cors';
import express from 'express';
import { success } from './utils/text-coloring';
import './database';

const app = express();
app.use(cors());
app.disable('x-powered-by');

app.get('/', (...[, response]) => {
  response.json({ status: 'running' });
});

app.listen(process.env.PORT ?? 3333, () =>
  console.info(success`Server is running on port:`, process.env.PORT ?? 3333),
);
