import { getUserByAccessToken } from '../services/userService';
import { NextFunction, Request, Response } from 'express';
import logger from '../helpers/logger';
import { get, merge } from 'lodash';

export const ensureAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authorizationHeader = get(req.headers, 'authorization');
    let accessToken: string | null = null;

    if (authorizationHeader) {
      const tokenParts = authorizationHeader.split(' ');
      if (tokenParts.length === 2 && tokenParts[0] === 'Bearer') {
        accessToken = tokenParts[1];
      } else {
        return res.status(401).json({ message: 'Invalid token format' });
      }
    } else {
      return res.status(401).json({ message: 'Authorization header missing' });
    }

    const existingUser = await getUserByAccessToken(accessToken);

    if (!existingUser) {
      return res.status(401).json({ message: 'User not found' });
    }

    merge(req, { identity: existingUser });

    next();
  } catch (error: any) {
    logger.error(error.message);
    return res.sendStatus(500);
  }
};
