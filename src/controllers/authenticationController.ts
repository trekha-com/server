import { createUser, getUserByEmail } from '../services/userService';
import { compareSync, genSaltSync, hashSync } from 'bcrypt';
import { Request, Response } from 'express';
import logger from '../helpers/logger';
import jwt from 'jsonwebtoken';

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

    const accessToken = jwt.sign({ id: user._id }, process.env.SECRET!);

    return res.status(200).json({ message: 'Login successful', accessToken, tokenType: 'Bearer', expiresIn: 3600 });
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

    const accessToken = jwt.sign({ id: user._id }, process.env.SECRET!);

    return res.status(200).json({ message: 'Register successful', accessToken, tokenType: 'Bearer', expiresIn: 3600 });
  } catch (error: any) {
    logger.error(error.message);
    return res.sendStatus(500);
  }
};
