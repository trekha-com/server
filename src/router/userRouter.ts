import { Router } from 'express';

import { removeUser, getAllUsers, getSingleUser, updateUser, updateUserRole } from '../controllers/userController';
import { accountMiddlwares, adminMiddlewares } from '../middlewares/authorizationMiddleware';

export default (router: Router) => {
  router.get('/users', adminMiddlewares, getAllUsers);
  router.get('/users/:userId', accountMiddlwares, getSingleUser);
  router.put('/users/:userId', accountMiddlwares, updateUser);
  router.put('/users/:userId/role', adminMiddlewares, updateUserRole);
  router.delete('/users/:userId', accountMiddlwares, removeUser);
};
