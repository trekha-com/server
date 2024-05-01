import express from 'express';
import logger from '../helpers/logger';

import { deleteUserById, getUserById, getUsers, updateUserById } from '../services/user';
import { UserRoles } from '../config/roles';

export const getAllUsers = async (req: express.Request, res: express.Response) => {
  try {
    const users = await getUsers();

    return res.status(200).json(users);
  } catch (error: any) {
    logger.error(error.message);
    return res.sendStatus(500);
  }
};

export const getUser = async (req: express.Request, res: express.Response) => {
  try {
    const { id } = req.params;

    const user = await getUserById(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json(user);
  } catch (error: any) {
    logger.error(error.message);
    return res.sendStatus(500);
  }
};

export const updateUser = async (req: express.Request, res: express.Response) => {
  try {
    const { id } = req.params;
    const { username, preferences } = req.body;

    const user = await updateUserById(id, { username, preferences });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json(user);
  } catch (error: any) {
    logger.error(error.message);
    return res.sendStatus(500);
  }
};

export const updateUserRole = async (req: express.Request, res: express.Response) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    if (!role || !Object.values(UserRoles).includes(role)) {
      return res.status(400).json({ message: 'Invalid data' });
    }

    const user = await updateUserById(id, { role });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json(user);
  } catch (error: any) {
    logger.error(error.message);
    return res.sendStatus(500);
  }
};

export const deleteUser = async (req: express.Request, res: express.Response) => {
  try {
    const { id } = req.params;

    const deletedUser = await deleteUserById(id);

    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json(deletedUser);
  } catch (error: any) {
    logger.error(error.message);
    return res.sendStatus(500);
  }
};
