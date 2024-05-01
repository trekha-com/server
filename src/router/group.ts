import express from 'express';

import { deleteGroup, getAllGroups, getGroup, newGroup, updateGroup } from '../controllers/group';
import { isAuthenticated } from '../middlewares/authentication';
import { isAdmin } from '../middlewares/authorization';

export default (router: express.Router) => {
  router.get('/groups', isAuthenticated, isAdmin, getAllGroups);
  router.get('/groups/:id', isAuthenticated, getGroup);
  router.post('/groups', isAuthenticated, newGroup);
  router.put('/groups/:id', isAuthenticated, updateGroup);
  router.delete('/groups/:id', isAuthenticated, deleteGroup);
};
