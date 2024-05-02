import GroupModel from '../models/groupModel';

export const getGroups = () => {
  return GroupModel.find();
};

export const getGroupById = (id: string) => {
  return GroupModel.findOne({ _id: id });
};

export const createGroup = async (values: Record<string, any>) => {
  const group = await new GroupModel(values).save();
  return group.toObject();
};

export const deleteGroupById = (id: string) => {
  return GroupModel.findOneAndDelete({ _id: id });
};

export const updateGroupById = (id: string, values: Record<string, any>) => {
  return GroupModel.findOneAndUpdate({ _id: id }, values);
};
