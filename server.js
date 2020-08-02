import express from 'express';

import './config';
import v1 from './routers/v1';

const app = new express();

app.use('/api/v1', v1)

app.listen(process.env.API_PORT, (url) => {
  console.log('Server is listening port 4000');
});
