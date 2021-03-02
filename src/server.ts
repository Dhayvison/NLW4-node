import express from 'express'
import Text from './utils/TextColoring'

const app = express();

app.listen(3333, () => console.info(Text.green('Server is running')));

