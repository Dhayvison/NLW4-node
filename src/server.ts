import { app } from './app';
import { success } from './utils/text-coloring';

app.listen(process.env.PORT || 3333, () =>
  console.info(success`Server is running on port:`, process.env.PORT || 3333),
);
