import express from 'express';

import { deleteUser, getAllUsers, getUser, updateUser, updateUserRole } from '../controllers/user';
import { isAuthenticated } from '../middlewares/authentication';
import { isAdmin, isOwner } from '../middlewares/authorization';

export default (router: express.Router) => {
  router.get('/users', isAuthenticated, isAdmin, getAllUsers);
  router.get('/users/:id', isAuthenticated, getUser);
  router.put('/users/:id', isAuthenticated, isOwner, updateUser);
  router.put('/users/:id/role', isAuthenticated, isAdmin, updateUserRole);
  router.delete('/users/:id', isAuthenticated, isOwner, deleteUser);
};
