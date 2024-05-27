import { NextFunction, Request, Response } from 'express';
import logger from '../helpers/logger';

export const loggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
  logger.log(`${req.method} ${req.originalUrl}`);
  next();
};
