import { Router } from 'express';

import groupMembershipRouter from './groupMembershipRouter';
import authentication from './authenticationRouter';
import group from './groupRouter';
import user from './userRouter';

const router = Router();

export default (): Router => {
  authentication(router);
  user(router);
  group(router);
  groupMembershipRouter(router);

  return router;
};
