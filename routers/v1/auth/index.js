import { Router } from 'express';
import { signin, signup } from '../../../controllers/auth';

const router = new Router();

const auth = () => {
  router.post('/signup', signup);
  router.post('/signin', signin);

  return router;
};

export default auth;
