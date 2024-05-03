import { Router } from 'express';

import { removeGroup, getAllGroups, getSingleGroup, createNewGroup, updateGroup } from '../controllers/groupController';
import { adminMiddlewares, groupAdminMiddlewares, groupMiddlewares } from '../middlewares/authorizationMiddleware';
import { ensureAuthenticated } from '../middlewares/authenticationMiddleware';

export default (router: Router) => {
  router.get('/groups', adminMiddlewares, getAllGroups);
  router.get('/groups/:groupId', groupMiddlewares, getSingleGroup);
  router.post('/groups', ensureAuthenticated, createNewGroup);
  router.put('/groups/:groupId', groupAdminMiddlewares, updateGroup);
  router.delete('/groups/:groupId', groupAdminMiddlewares, removeGroup);
};
