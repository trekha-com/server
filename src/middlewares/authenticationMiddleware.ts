import { NextFunction, Request, Response } from 'express';
import { merge } from 'lodash';

import { getUserBySessionToken } from '../services/userService';
import logger from '../helpers/logger';

export const ensureAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const sessionToken = req.cookies['TREKHA-AUTH'];

    if (!sessionToken) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const existingUser = await getUserBySessionToken(sessionToken);

    if (!existingUser) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    merge(req, { identity: existingUser });

    next();
  } catch (error: any) {
    logger.error(error.message);
    return res.sendStatus(500);
  }
};
