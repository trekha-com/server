import UserModel from '../models/userModel';
import jwt from 'jsonwebtoken';

export const getUsers = () => {
  return UserModel.find();
};

export const getUserById = (id: string) => {
  return UserModel.findOne({ _id: id });
};

export const getUserByEmail = (email: string) => {
  return UserModel.findOne({ email });
};

export const getUserByAccessToken = (accessToken: string) => {
  const { userId } = jwt.decode(accessToken) as unknown as any;
  return UserModel.findOne({ _id: userId });
};

export const createUser = async (values: Record<string, any>) => {
  const user = await new UserModel(values).save();
  return user.toObject();
};

export const deleteUserById = (id: string) => {
  return UserModel.findOneAndDelete({ _id: id });
};

export const updateUserById = (id: string, values: Record<string, any>) => {
  return UserModel.findOneAndUpdate({ _id: id }, values, { new: true });
};
