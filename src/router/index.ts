import express from 'express';

import authentication from './authenticationRouter';
import user from './userRouter';
import group from './groupRouter';

const router = express.Router();

export default (): express.Router => {
  authentication(router);
  group(router);
  user(router);

  return router;
};
