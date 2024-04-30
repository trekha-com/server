import express from 'express';
import { get } from 'lodash';
import { Types } from 'mongoose';
import logger from '../helpers/logger';
import { UserRoles } from '../config/roles';

export const isAdmin = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const role = get(req, 'identity.role') as unknown as UserRoles;

    if (role !== UserRoles.ADMIN) {
      return res.status(403).json({ message: 'Permission denied' });
    }

    next();
  } catch (error: any) {
    logger.error(error.message);
    return res.sendStatus(500);
  }
};

export const isOwner = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const { id } = req.params;
    const currentId = get(req, 'identity._id') as unknown as Types.ObjectId;

    if (!currentId) {
      return res.status(403).json({ message: 'Permission denied' });
    }

    if (currentId.toString() !== id) {
      return res.status(403).json({ message: 'Permission denied' });
    }

    next();
  } catch (error: any) {
    logger.error(error.message);
    return res.sendStatus(500);
  }
};
