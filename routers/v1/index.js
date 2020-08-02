import { Router } from 'express';

import auth from './auth';

const router = new Router();

const v1 = () => {
  router.use('/auth', auth);
  router.use('/notes', notes);

  return router;
};

export default v1;
