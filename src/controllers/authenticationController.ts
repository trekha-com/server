import { createUser, getUserByEmail } from '../services/userService';
import { compareSync, genSaltSync, hashSync } from 'bcrypt';
import { Request, Response } from 'express';
import { User } from '../models/userModel';
import logger from '../helpers/logger';
import jwt from 'jsonwebtoken';

const MAX_AGE = 60 * 60 * 24 * 30;
const SESSION_STORAGE_KEY = 'session';

const setSessionCookie = (res: Response, payload: { token: string; user: User }) => {
  res.cookie(SESSION_STORAGE_KEY, JSON.stringify(payload), {
    maxAge: MAX_AGE * 1000,
    path: '/',
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
  });
};

const signAccessToken = (userId: string) => {
  return jwt.sign({ userId }, process.env.SECRET!, { expiresIn: MAX_AGE });
};

export const getSession = async (req: Request, res: Response) => {
  try {
    const session = req.cookies[SESSION_STORAGE_KEY];

    if (!session) {
      return res.status(404).json({ message: 'Session not found' });
    }

    const { token, user } = JSON.parse(session);

    if (!token || !user) {
      return res.status(400).json({ message: 'Invalid session' });
    }

    const userId = user._id;
    const newToken = signAccessToken(userId);

    setSessionCookie(res, { token: newToken, user });
    return res.status(200).json({ token: newToken, user });
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
    const token = signAccessToken(userId);

    setSessionCookie(res, { token, user });
    return res.status(200).json({ message: 'Authenticated', token, user });
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
    const token = signAccessToken(userId);

    setSessionCookie(res, { token, user });
    return res.status(200).json({ message: 'Authenticated', token, user });
  } catch (error: any) {
    logger.error(error.message);
    return res.sendStatus(500);
  }
};
