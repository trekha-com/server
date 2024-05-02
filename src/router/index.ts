import express from 'express';

import authentication from './authenticationRouter';
import user from './userRouter';
import group from './groupRouter';
import groupMembershipRouter from './groupMembershipRouter';

const router = express.Router();

export default (): express.Router => {
  authentication(router);
  user(router);
  group(router);
  groupMembershipRouter(router);

  return router;
};
