import { groupAdminMiddlewares, groupMiddlewares } from '../middlewares/authorizationMiddleware';
import { joinGroup, kickMember, leaveGroup } from '../controllers/groupMembershipController';
import { ensureAuthenticated } from '../middlewares/authenticationMiddleware';
import { Router } from 'express';

export default (router: Router) => {
  router.post('/groups/:groupId/join', ensureAuthenticated, joinGroup);
  router.post('/groups/:groupId/leave', groupMiddlewares, leaveGroup);
  router.post('/groups/:groupId/kick/:userId', groupAdminMiddlewares, kickMember);
};
