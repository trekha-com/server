import { getUserByAccessToken } from '../services/userService';
import { NextFunction, Request, Response } from 'express';
import logger from '../helpers/logger';
import { get, merge } from 'lodash';
import jwt from 'jsonwebtoken';

// Helper function to extract and verify the token
const extractToken = (authorizationHeader: string | undefined): string | null => {
  if (!authorizationHeader) {
    return null;
  }

  const tokenParts = authorizationHeader.split(' ');
  if (tokenParts.length === 2 && tokenParts[0] === 'Bearer') {
    return tokenParts[1];
  }

  return null;
};

export const ensureAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authorizationHeader = get(req.headers, 'authorization');
    const accessToken = extractToken(authorizationHeader);

    if (!accessToken) {
      return res.status(401).json({ message: 'Authorization header missing or invalid token format' });
    }

    jwt.verify(accessToken, process.env.SECRET!, (error: any, _: any) => {
      if (error) {
        return res.status(401).json({ message: 'Invalid token' });
      }
    });

    const existingUser = await getUserByAccessToken(accessToken);

    if (!existingUser) {
      return res.status(401).json({ message: 'User not found' });
    }

    merge(req, { identity: existingUser });
    next();
  } catch (error: any) {
    logger.error('Authentication error:', error);
    return res.sendStatus(500);
  }
};
