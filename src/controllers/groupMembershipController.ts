import { addMember, removeMember } from '../services/groupMembershipService';
import { Request, Response } from 'express';
import logger from '../helpers/logger';
import { Types } from 'mongoose';
import { get } from 'lodash';

export const joinGroup = async (req: Request, res: Response) => {
  try {
    const userId = get(req, 'identity._id') as unknown as Types.ObjectId;
    const { groupId } = req.params;

    const group = await addMember(userId.toString(), groupId);

    if (!group) {
      return res.status(404).json({ message: 'Group not found' });
    }

    return res.status(200).json({ message: 'Joined group successfully' });
  } catch (error: any) {
    logger.error(error.message);
    return res.sendStatus(500);
  }
};

export const leaveGroup = async (req: Request, res: Response) => {
  try {
    const userId = get(req, 'identity._id') as unknown as Types.ObjectId;
    const { groupId } = req.params;

    const group = await removeMember(userId.toString(), groupId);

    if (!group) {
      return res.status(404).json({ message: 'Group not found' });
    }

    return res.status(200).json({ messaged: 'Left group successfully', group });
  } catch (error: any) {
    logger.error(error.message);
    return res.sendStatus(500);
  }
};

export const kickMember = async (req: Request, res: Response) => {
  try {
    const { groupId, userId } = req.params;

    const group = await removeMember(userId, groupId);

    if (!group) {
      return res.status(404).json({ message: 'Group not found' });
    }

    return res.status(200).json({ message: 'Member kicked successfully', group });
  } catch (error: any) {
    logger.error(error.message);
    return res.sendStatus(500);
  }
};
