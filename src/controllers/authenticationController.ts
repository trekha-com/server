import { createUser, getUserByEmail } from '../services/userService';
import { compareSync, genSaltSync, hashSync } from 'bcrypt';
import { Request, Response } from 'express';
import logger from '../helpers/logger';
import jwt from 'jsonwebtoken';
import { get } from 'lodash';

const MAX_AGE = 60 * 60 * 24 * 30; // days

export const getLoggedUser = async (req: Request, res: Response) => {
  try {
    const user = get(req, 'identity');
    return res.status(200).json({ message: 'User fetched successfully', user });
  } catch (error: any) {
    logger.error(error.message);
    return res.sendStatus(500);
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Missing fields' });
    }

    const user = await getUserByEmail(email).select('+password');

    if (!user || !compareSync(password, user.password)) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const userId = user._id.toString();
    const accessToken = jwt.sign({ userId }, process.env.SECRET!, { expiresIn: MAX_AGE });

    res.cookie('OutSiteJWT', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: MAX_AGE * 1000,
      path: '/',
    });

    return res.status(200).json({ message: 'Authenticated' });
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
      password: hashSync(password, salt),
    });

    const userId = user._id.toString();
    const accessToken = jwt.sign({ userId }, process.env.SECRET!, { expiresIn: MAX_AGE });

    res.cookie('OutSiteJWT', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: MAX_AGE * 1000,
      path: '/',
    });

    return res.status(200).json({ message: 'Authenticated' });
  } catch (error: any) {
    logger.error(error.message);
    return res.sendStatus(500);
  }
};
