import express from 'express';

import { ensureAuthenticated } from '../middlewares/authenticationMiddleware';
import { adminMiddlewares, groupAdminMiddlewares, groupMiddlewares } from '../middlewares/authorizationMiddleware';
import { deleteGroup, getAllGroups, getGroup, newGroup, updateGroup } from '../controllers/groupController';

export default (router: express.Router) => {
  router.get('/groups', adminMiddlewares, getAllGroups);
  router.get('/groups/:id', groupMiddlewares, getGroup);
  router.post('/groups', ensureAuthenticated, newGroup);
  router.put('/groups/:id', groupAdminMiddlewares, updateGroup);
  router.delete('/groups/:id', groupAdminMiddlewares, deleteGroup);
};
