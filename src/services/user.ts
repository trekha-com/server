import UserModel from '../models/user';

export const getUsers = () => {
  return UserModel.find();
};

export const getUserByEmail = (email: string) => {
  return UserModel.findOne({ email });
};

export const getUserBySessionToken = (sessionToken: string) => {
  return UserModel.findOne({ 'authentication.sessionToken': sessionToken });
};

export const getUserById = (id: string) => {
  return UserModel.findOne({ _id: id });
};

export const createUser = async (values: Record<string, any>) => {
  const user = await new UserModel(values).save();
  return user.toObject();
};

export const deleteUserById = (id: string) => {
  return UserModel.findOneAndDelete({ _id: id });
};

export const updateUserById = (id: string, values: Record<string, any>) => {
  return UserModel.findOneAndUpdate({ _id: id }, values);
};
