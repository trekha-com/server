import express from 'express';

import { ensureAuthenticated } from '../middlewares/authenticationMiddleware';
import { adminMiddlewares, groupAdminMiddlewares, groupMiddlewares } from '../middlewares/authorizationMiddleware';
import { removeGroup, getAllGroups, getSingleGroup, createNewGroup, updateGroup } from '../controllers/groupController';

export default (router: express.Router) => {
  router.get('/groups', adminMiddlewares, getAllGroups);
  router.get('/groups/:id', groupMiddlewares, getSingleGroup);
  router.post('/groups', ensureAuthenticated, createNewGroup);
  router.put('/groups/:id', groupAdminMiddlewares, updateGroup);
  router.delete('/groups/:id', groupAdminMiddlewares, removeGroup);
};
