import { getLoggedUser, login, register } from '../controllers/authenticationController';
import { ensureAuthenticated } from '../middlewares/authenticationMiddleware';
import { Router } from 'express';

export default (router: Router) => {
  router.get('/auth/me', ensureAuthenticated, getLoggedUser);
  router.post('/auth/login', login);
  router.post('/auth/register', register);
};
