import { getAllUsers, getSingleUser, removeUser, updateUser, updateUserRole } from '../controllers/userController';
import { accountMiddlwares, adminMiddlewares } from '../middlewares/authorizationMiddleware';
import { Router } from 'express';

export default (router: Router) => {
  router.get('/users', adminMiddlewares, getAllUsers);
  router.get('/users/:userId', accountMiddlwares, getSingleUser);
  router.put('/users/:userId', accountMiddlwares, updateUser);
  router.put('/users/:userId/role', adminMiddlewares, updateUserRole);
  router.delete('/users/:userId', accountMiddlwares, removeUser);
};
