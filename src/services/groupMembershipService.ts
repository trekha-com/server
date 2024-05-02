import GroupModel from '../models/groupModel';

export const addMember = (userId: string, groupId: string) => {
  return GroupModel.findOneAndUpdate({ _id: groupId }, { $push: { members: { user: userId } } }, { new: true });
};

export const removeMember = (userId: string, groupId: string) => {
  return GroupModel.findOneAndUpdate({ _id: groupId }, { $pull: { members: { user: userId } } }, { new: true });
};
