import express from 'express';

import { accountMiddlwares, adminMiddlewares } from '../middlewares/authorizationMiddleware';
import { removeUser, getAllUsers, getSingleUser, updateUser, updateUserRole } from '../controllers/userController';

export default (router: express.Router) => {
  router.get('/users', adminMiddlewares, getAllUsers);
  router.get('/users/:userId', accountMiddlwares, getSingleUser);
  router.put('/users/:userId', accountMiddlwares, updateUser);
  router.put('/users/:userId/role', adminMiddlewares, updateUserRole);
  router.delete('/users/:userId', accountMiddlwares, removeUser);
};
