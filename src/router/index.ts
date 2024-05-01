import express from 'express';

import authentication from './authentication';
import user from './user';
import group from './group';

const router = express.Router();

export default (): express.Router => {
  authentication(router);
  group(router);
  user(router);

  return router;
};
