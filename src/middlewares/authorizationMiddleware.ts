import { ensureAuthenticated } from './authenticationMiddleware';
import { NextFunction, Request, Response } from 'express';
import { MemberRoles, UserRoles } from '../config/roles';
import { getGroupById } from '../services/groupService';
import logger from '../helpers/logger';
import { get, some } from 'lodash';
import { Types } from 'mongoose';

export const ensureAdminRole = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authenticatedUserRole = get(req, 'identity.role') as unknown as UserRoles;

    if (authenticatedUserRole !== UserRoles.ADMIN) {
      return res.status(403).json({ message: 'Permission denied: Admin privileges required' });
    }

    next();
  } catch (error: any) {
    logger.error(error.message);
    return res.sendStatus(500);
  }
};

export const ensureAccountOwnership = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.params;
    const authenticatedUserId = get(req, 'identity._id') as unknown as Types.ObjectId;
    const authenticatedUserRole = get(req, 'identity.role') as unknown as UserRoles;

    // Admins can bypass ownership check
    if (authenticatedUserRole === UserRoles.ADMIN) {
      return next();
    }

    if (authenticatedUserId.toString() !== userId) {
      return res.status(403).json({ message: 'Permission denied: Account ownership required' });
    }

    next();
  } catch (error: any) {
    logger.error(error.message);
    return res.sendStatus(500);
  }
};

export const ensureGroupMembership = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { groupId } = req.params;
    const authenticatedUserId = get(req, 'identity._id') as unknown as Types.ObjectId;
    const authenticatedUserRole = get(req, 'identity.role') as unknown as UserRoles;

    // Admins can bypass membership check
    if (authenticatedUserRole === UserRoles.ADMIN) {
      return next();
    }

    const group = await getGroupById(groupId);

    if (!group) {
      return res.status(404).json({ message: 'Group not found' });
    }

    const isMember = some(group.members, (member) => member.user.equals(authenticatedUserId));

    if (!isMember) {
      return res.status(403).json({ message: 'Permission denied: Group membership required' });
    }

    next();
  } catch (error: any) {
    logger.error(error.message);
    return res.sendStatus(500);
  }
};

export const ensureGroupAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { groupId } = req.params;
    const authenticatedUserId = get(req, 'identity._id') as unknown as Types.ObjectId;
    const authenticatedUserRole = get(req, 'identity.role') as unknown as UserRoles;

    // Admins can bypass group admin check
    if (authenticatedUserRole === UserRoles.ADMIN) {
      return next();
    }

    const group = await getGroupById(groupId);

    if (!group) {
      return res.status(404).json({ message: 'Group not found' });
    }

    const isAdmin = some(group.members, (member) => member.user.equals(authenticatedUserId) && member.role === MemberRoles.ADMIN);

    if (!isAdmin) {
      return res.status(403).json({ message: 'Permission denied: Group admin privileges required' });
    }

    next();
  } catch (error: any) {
    logger.error(error.message);
    return res.sendStatus(500);
  }
};

export const accountMiddlwares = [ensureAuthenticated, ensureAccountOwnership];

export const adminMiddlewares = [ensureAuthenticated, ensureAdminRole];

export const groupMiddlewares = [ensureAuthenticated, ensureGroupMembership];

export const groupAdminMiddlewares = [ensureAuthenticated, ensureGroupAdmin];
