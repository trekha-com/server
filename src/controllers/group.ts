import express from 'express';
import logger from '../helpers/logger';
import { get } from 'lodash';
import { Types } from 'mongoose';
import { MemberRoles } from '../config/roles';

import { createGroup, deleteGroupById, getGroupById, getGroups, updateGroupById } from '../services/group';

export const getAllGroups = async (req: express.Request, res: express.Response) => {
  try {
    const groups = await getGroups();

    return res.status(200).json(groups);
  } catch (error: any) {
    logger.error(error.message);
    return res.sendStatus(500);
  }
};

export const getGroup = async (req: express.Request, res: express.Response) => {
  try {
    const { id } = req.params;

    const group = getGroupById(id);

    if (!group) {
      return res.status(404).json({ message: 'Group not found' });
    }

    return res.status(200).json(group);
  } catch (error: any) {
    logger.error(error.message);
    return res.sendStatus(500);
  }
};

export const newGroup = async (req: express.Request, res: express.Response) => {
  try {
    const { name } = req.body;
    const { _id: ownerId } = get(req, 'identity._id') as unknown as Types.ObjectId;

    if (!name) {
      return res.status(400).json({ message: 'Invalid data' });
    }

    const group = await createGroup({ name, members: [{ user: ownerId, role: MemberRoles.OWNER }] });

    return res.status(200).json(group);
  } catch (error: any) {
    logger.error(error.message);
    return res.sendStatus(500);
  }
};

export const updateGroup = async (req: express.Request, res: express.Response) => {
  try {
    const { id } = req.params;
    const { name, preferences } = req.body;

    const group = await updateGroupById(id, { name, preferences });

    if (!group) {
      return res.status(404).json({ message: 'Group not found' });
    }

    return res.status(200).json(group);
  } catch (error: any) {
    logger.error(error.message);
    return res.sendStatus(500);
  }
};

export const deleteGroup = async (req: express.Request, res: express.Response) => {
  try {
    const { id } = req.params;

    const deletedGroup = await deleteGroupById(id);

    if (!deletedGroup) {
      return res.status(404).json({ message: 'Group not found' });
    }

    return res.status(200).json(deletedGroup);
  } catch (error: any) {
    logger.error(error.message);
    return res.sendStatus(500);
  }
};
