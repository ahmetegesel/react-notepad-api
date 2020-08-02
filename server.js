import express from 'express';
import bodyParser from 'body-parser';

import './config';

import v1 from './routers/v1';

const app = new express();

app.use(bodyParser.json());

app.use('/api/v1', v1())

const PORT = process.env.API_PORT;

app.listen(PORT, () => {
  console.log(`Server is listening port ${PORT}`);
});
