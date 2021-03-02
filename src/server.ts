import express from 'express'
import {success} from './utils/text-coloring'

const app = express();

app.listen(3333, () => console.info(success`Server is running`));
