import express from 'express';

import { accountMiddlwares, adminMiddlewares } from '../middlewares/authorization';
import { deleteUser, getAllUsers, getUser, updateUser, updateUserRole } from '../controllers/user';

export default (router: express.Router) => {
  router.get('/users', adminMiddlewares, getAllUsers);
  router.get('/users/:id', accountMiddlwares, getUser);
  router.put('/users/:id', accountMiddlwares, updateUser);
  router.put('/users/:id/role', adminMiddlewares, updateUserRole);
  router.delete('/users/:id', accountMiddlwares, deleteUser);
};
