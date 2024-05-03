import { genSaltSync, hashSync, compareSync } from 'bcrypt';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { createUser, getUserByEmail } from '../services/userService';
import logger from '../helpers/logger';

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Missing fields' });
    }

    const user = await getUserByEmail(email).select('+authentication.salt +authentication.password');

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    if (!compareSync(password, user.authentication!.password)) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    user.authentication!.sessionToken = jwt.sign({ id: user._id }, process.env.SECRET!);

    await user.save();

    res.cookie('TREKHA-AUTH', user.authentication!.sessionToken, { domain: 'localhost', path: '/' });

    return res.status(200).json(user);
  } catch (error: any) {
    logger.error(error.message);
    return res.sendStatus(500);
  }
};

export const register = async (req: Request, res: Response) => {
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
