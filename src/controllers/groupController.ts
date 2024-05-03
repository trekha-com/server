import { Request, Response } from 'express';
import { Types } from 'mongoose';
import { get } from 'lodash';

import { createGroup, deleteGroupById, getGroupById, getGroups, updateGroupById } from '../services/groupService';
import { MemberRoles } from '../config/roles';
import logger from '../helpers/logger';

export const getAllGroups = async (req: Request, res: Response) => {
  try {
    const groups = await getGroups();

    return res.status(200).json(groups);
  } catch (error: any) {
    logger.error(error.message);
    return res.sendStatus(500);
  }
};

export const getSingleGroup = async (req: Request, res: Response) => {
  try {
    const { groupId } = req.params;

    const group = getGroupById(groupId);

    if (!group) {
      return res.status(404).json({ message: 'Group not found' });
    }

    return res.status(200).json(group);
  } catch (error: any) {
    logger.error(error.message);
    return res.sendStatus(500);
  }
};

export const createNewGroup = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const { _id: ownerId } = get(req, 'identity._id') as unknown as Types.ObjectId;

    if (!name) {
      return res.status(400).json({ message: 'Invalid data' });
    }

    const group = await createGroup({ name, members: [{ user: ownerId, role: MemberRoles.ADMIN }] });

    return res.status(200).json(group);
  } catch (error: any) {
    logger.error(error.message);
    return res.sendStatus(500);
  }
};

export const updateGroup = async (req: Request, res: Response) => {
  try {
    const { groupId } = req.params;
    const { name, preferences } = req.body;

    const group = await updateGroupById(groupId, { name, preferences });

    if (!group) {
      return res.status(404).json({ message: 'Group not found' });
    }

    return res.status(200).json(group);
  } catch (error: any) {
    logger.error(error.message);
    return res.sendStatus(500);
  }
};

export const removeGroup = async (req: Request, res: Response) => {
  try {
    const { groupId } = req.params;

    const deletedGroup = await deleteGroupById(groupId);

    if (!deletedGroup) {
      return res.status(404).json({ message: 'Group not found' });
    }

    return res.status(200).json(deletedGroup);
  } catch (error: any) {
    logger.error(error.message);
    return res.sendStatus(500);
  }
};
