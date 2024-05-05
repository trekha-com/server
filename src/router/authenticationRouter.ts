import { login, register } from '../controllers/authenticationController';
import { Router } from 'express';

export default (router: Router) => {
  router.post('/auth/login', login);
  router.post('/auth/register', register);
};
