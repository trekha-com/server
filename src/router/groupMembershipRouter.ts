import express from 'express';

import { ensureAuthenticated } from '../middlewares/authenticationMiddleware';
import { groupAdminMiddlewares, groupMiddlewares } from '../middlewares/authorizationMiddleware';
import { joinGroup, kickMember, leaveGroup } from '../controllers/groupMembershipController';

export default (router: express.Router) => {
  router.post('/groups/:groupId/join', ensureAuthenticated, joinGroup);
  router.post('/groups/:groupId/leave', groupMiddlewares, leaveGroup);
  router.post('/groups/:groupId/kick/:userId', groupAdminMiddlewares, kickMember);
};
