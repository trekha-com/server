import express from 'express';

import { deleteUser, getAllUsers, getUser, updateUser } from '../controllers/user';
import { isAuthenticated, isOwner } from '../middlewares/authentication';

export default (router: express.Router) => {
  router.get('/users', isAuthenticated, getAllUsers);
  router.get('/users/:id', isAuthenticated, getUser);
  router.put('/users/:id', isAuthenticated, isOwner, updateUser);
  router.delete('/users/:id', isAuthenticated, isOwner, deleteUser);
};
