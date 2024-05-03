import { genSaltSync, hashSync } from 'bcrypt';
import { Request, Response } from 'express';

import { createUser, deleteUserById, getUserByEmail, getUserById, getUsers, updateUserById } from '../services/userService';
import { UserRoles } from '../config/roles';
import logger from '../helpers/logger';

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await getUsers();

    return res.status(200).json(users);
  } catch (error: any) {
    logger.error(error.message);
    return res.sendStatus(500);
  }
};

export const getSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const user = await getUserById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json(user);
  } catch (error: any) {
    logger.error(error.message);
    return res.sendStatus(500);
  }
};

export const createNewUser = async (req: Request, res: Response) => {
  try {
    const { email, password, username } = req.body;

    if (!email || !password || !username) {
      return res.status(400).json({ message: 'Missing fields' });
    }

    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      return res.status(409).json({ message: 'Email already in use' });
    }

    const salt = genSaltSync(10);
    const user = await createUser({
      email: email,
      username: username,
      authentication: {
        password: hashSync(password, salt),
      },
    });

    return res.status(200).json(user);
  } catch (error: any) {
    logger.error(error.message);
    return res.sendStatus(500);
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { username, preferences } = req.body;

    const user = await updateUserById(userId, { username, preferences });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json(user);
  } catch (error: any) {
    logger.error(error.message);
    return res.sendStatus(500);
  }
};

export const updateUserRole = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { role } = req.body;

    if (!role || !Object.values(UserRoles).includes(role)) {
      return res.status(400).json({ message: 'Invalid data' });
    }

    const user = await updateUserById(userId, { role });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json(user);
  } catch (error: any) {
    logger.error(error.message);
    return res.sendStatus(500);
  }
};

export const removeUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const deletedUser = await deleteUserById(userId);

    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json(deletedUser);
  } catch (error: any) {
    logger.error(error.message);
    return res.sendStatus(500);
  }
};
