import express from 'express';
import { Types } from 'mongoose';
import { find, get } from 'lodash';

import logger from '../helpers/logger';
import { addMember, removeMember } from '../services/groupMembershipService';

export const joinGroup = async (req: express.Request, res: express.Response) => {
  try {
    const userId = get(req, 'identity._id') as unknown as Types.ObjectId;
    const { groupId } = req.params;

    const group = await addMember(userId.toString(), groupId);

    if (!group) {
      return res.status(404).json({ message: 'Group not found' });
    }

    return res.status(200).json(group);
  } catch (error: any) {
    logger.error(error.message);
    return res.sendStatus(500);
  }
};

export const leaveGroup = async (req: express.Request, res: express.Response) => {
  try {
    const userId = get(req, 'identity._id') as unknown as Types.ObjectId;
    const { groupId } = req.params;

    const group = await removeMember(userId.toString(), groupId);

    if (!group) {
      return res.status(404).json({ message: 'Group not found' });
    }

    return res.status(200).json(group);
  } catch (error: any) {
    logger.error(error.message);
    return res.sendStatus(500);
  }
};

export const kickMember = async (req: express.Request, res: express.Response) => {
  try {
    const { groupId, userId } = req.params;

    const group = await removeMember(userId, groupId);

    if (!group) {
      return res.status(404).json({ message: 'Group not found' });
    }

    return res.status(200).json(group);
  } catch (error: any) {
    logger.error(error.message);
    return res.sendStatus(500);
  }
};
