import express from 'express';

import { ensureAuthenticated } from '../middlewares/authenticationMiddleware';
import { adminMiddlewares, groupAdminMiddlewares, groupMiddlewares } from '../middlewares/authorizationMiddleware';
import { removeGroup, getAllGroups, getSingleGroup, createNewGroup, updateGroup } from '../controllers/groupController';

export default (router: express.Router) => {
  router.get('/groups', adminMiddlewares, getAllGroups);
  router.get('/groups/:groupId', groupMiddlewares, getSingleGroup);
  router.post('/groups', ensureAuthenticated, createNewGroup);
  router.put('/groups/:groupId', groupAdminMiddlewares, updateGroup);
  router.delete('/groups/:groupId', groupAdminMiddlewares, removeGroup);
};
