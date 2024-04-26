import express from 'express';
import { get, merge } from 'lodash';
import logger from '../helpers/logger';
import Roles from '../config/roles';

export const isAdmin = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const role = get(req, 'identity.role') as unknown as Roles;

    if (!Object.values(Roles).includes(role)) {
      return res.sendStatus(403);
    }

    if (role !== Roles.ADMIN) {
      return res.sendStatus(403);
    }

    next();
  } catch (error: any) {
    logger.error(error.message);
    return res.sendStatus(500);
  }
};
