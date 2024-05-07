import { createGroup, deleteGroupById, getGroupById, getGroups, updateGroupById } from '../services/groupService';
import { MemberRoles } from '../config/roles';
import { Request, Response } from 'express';
import logger from '../helpers/logger';
import { Types } from 'mongoose';
import { get } from 'lodash';

export const getAllGroups = async (req: Request, res: Response) => {
  try {
    const groups = await getGroups();

    return res.status(200).json({ message: 'Groups fetched successfully', groups });
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

    return res.status(200).json({ message: 'Group fetched successfully', group });
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

    return res.status(200).json({ message: 'Group created successfully', group });
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

    return res.status(200).json({ message: 'Group updated successfully', group });
  } catch (error: any) {
    logger.error(error.message);
    return res.sendStatus(500);
  }
};

export const removeGroup = async (req: Request, res: Response) => {
  try {
    const { groupId } = req.params;

    const group = await deleteGroupById(groupId);

    if (!group) {
      return res.status(404).json({ message: 'Group not found' });
    }

    return res.status(200).json({ message: 'Group deleted successfully', group });
  } catch (error: any) {
    logger.error(error.message);
    return res.sendStatus(500);
  }
};
