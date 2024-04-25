import express from 'express';
import logger from '../helpers/logger';

import { createUser, getUserByEmail } from '../services/user';
import { hash, random } from '../helpers/authentication';

export const login = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.sendStatus(400);
    }

    const user = await getUserByEmail(email).select('+authentication.salt +authentication.password');

    if (!user) {
      return res.sendStatus(400);
    }

    const expectedHash = hash(user.authentication!.salt, password);

    if (user.authentication!.password !== expectedHash) {
      return res.sendStatus(403);
    }

    const salt = random();
    user.authentication!.sessionToken = hash(salt, user._id.toString());

    await user.save();

    res.cookie('TREKHA-AUTH', user.authentication!.sessionToken, { domain: 'localhost', path: '/' });

    return res.status(200).json(user).end();
  } catch (error: any) {
    logger.error(error.message);
    return res.sendStatus(500);
  }
};

export const register = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password, username } = req.body;

    if (!email || !password || !username) {
      return res.sendStatus(400);
    }

    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      return res.sendStatus(400);
    }

    const salt = random();
    const user = await createUser({
      email: email,
      username: username,
      authentication: {
        password: hash(salt, password),
        salt: salt,
      },
    });

    return res.status(200).json(user).end();
  } catch (error: any) {
    logger.error(error.message);
    return res.sendStatus(500);
  }
};
