import { app } from './app';
import { success } from './utils/text-coloring';

app.listen(process.env.PORT, () =>
  console.info(success`Server is running on port:`, process.env.PORT),
);
