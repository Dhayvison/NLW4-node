import 'dotenv/config';
import cors from 'cors';
import express, { Response } from 'express';
import { success } from './utils/text-coloring';

const app = express();
app.use(cors());
app.disable('x-powered-by');

app.get('/', (req, res: Response) => {
  res.json({ status: 'running' });
});

app.listen(process.env.PORT ?? 3333, () =>
  console.info(success`Server is running on port:`, process.env.PORT ?? 3333),
);
