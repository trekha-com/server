import express from 'express';
import { get, merge } from 'lodash';
import logger from '../helpers/logger';

import { getUserBySessionToken } from '../services/user';

export const isOwner = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const { id } = req.params;
    const currentId = get(req, 'identity._id') as unknown as object;

    if (!currentId) {
      return res.sendStatus(403);
    }

    if (currentId.toString() !== id) {
      return res.sendStatus(403);
    }

    next();
  } catch (error: any) {
    logger.error(error.message);
    return res.sendStatus(500);
  }
};

export const isAuthenticated = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const sessionToken = req.cookies['TREKHA-AUTH'];

    if (!sessionToken) {
      return res.sendStatus(403);
    }

    const existingUser = await getUserBySessionToken(sessionToken);

    if (!existingUser) {
      return res.sendStatus(403);
    }

    merge(req, { identity: existingUser });

    next();
  } catch (error: any) {
    logger.error(error.message);
    return res.sendStatus(500);
  }
};
