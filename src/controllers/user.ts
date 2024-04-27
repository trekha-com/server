import express from 'express';
import logger from '../helpers/logger';

import { deleteUserById, getUserById, getUsers } from '../services/user';
import Roles from '../config/roles';

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

    const user = await getUserById(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user!.username = username ?? user.username;
    user!.preferences = preferences ?? user.preferences;
    await user?.save();

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

    if (!role || !Object.values(Roles).includes(role)) {
      return res.status(400).json({ message: 'Invalid data' });
    }

    const user = await getUserById(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user!.role = role;
    await user?.save();

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

    if (!deleteUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json(deletedUser);
  } catch (error: any) {
    logger.error(error.message);
    return res.sendStatus(500);
  }
};
