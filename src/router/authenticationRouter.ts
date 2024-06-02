import { getSession, login, register } from '../controllers/authenticationController';
import { Router } from 'express';

export default (router: Router) => {
  router.get('/auth/session', getSession);
  router.post('/auth/login', login);
  router.post('/auth/register', register);
};
