import express from 'express';
import logger from '../helpers/logger';

import { deleteUserById, getUserById, getUsers } from '../services/user';
import Roles from '../config/roles';

export const getAllUsers = async (req: express.Request, res: express.Response) => {
  try {
    const users = await getUsers();

    return res.status(200).json(users).end();
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
      res.sendStatus(404);
    }

    return res.status(200).json(user).end;
  } catch (error: any) {
    logger.error(error.message);
    return res.sendStatus(500);
  }
};

export const updateUser = async (req: express.Request, res: express.Response) => {
  try {
    const { id } = req.params;
    const { username } = req.body;

    if (!username) {
      return res.sendStatus(400);
    }

    const user = await getUserById(id);

    if (!user) {
      return res.sendStatus(404);
    }

    user!.username = username;
    await user?.save();

    return res.status(200).json(user).end();
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
      return res.sendStatus(400);
    }

    const user = await getUserById(id);

    if (!user) {
      return res.sendStatus(404);
    }

    user!.role = role;
    await user?.save();

    return res.status(200).json(user).end();
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
      res.sendStatus(404);
    }

    return res.status(200).json(deletedUser).end();
  } catch (error: any) {
    logger.error(error.message);
    return res.sendStatus(500);
  }
};
