import { InferSchemaType, Schema, model } from 'mongoose';
import { MemberRoles } from '../config/roles';

const groupSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    preferences: { type: Object, default: {} },
    members: [
      {
        user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        role: { type: String, default: MemberRoles.MEMBER },
      },
    ],
    invites: [
      {
        token: { type: String, required: true },
        maxUses: { type: Number },
        expirationDate: { type: String },
      },
    ],
  },
  { timestamps: true },
);

export type Group = InferSchemaType<typeof groupSchema>;

export const GroupModel = model<Group>('Group', groupSchema);

export default GroupModel;
