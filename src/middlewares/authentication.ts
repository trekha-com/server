import express from 'express';
import { merge } from 'lodash';
import logger from '../helpers/logger';

import { getUserBySessionToken } from '../services/user';

export const isAuthenticated = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const sessionToken = req.cookies['TREKHA-AUTH'];

    if (!sessionToken) {
      return res.send(401).json({ message: 'Unauthorized' });
    }

    const existingUser = await getUserBySessionToken(sessionToken);

    if (!existingUser) {
      return res.send(401).json({ message: 'Unauthorized' });
    }

    merge(req, { identity: existingUser });

    next();
  } catch (error: any) {
    logger.error(error.message);
    return res.sendStatus(500);
  }
};
