import { InferSchemaType, Schema, model } from 'mongoose';
import { MemberRoles } from '../config/roles';

const MemberSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    group: { type: Schema.Types.ObjectId, ref: 'Group', required: true },
    role: { type: MemberRoles, default: MemberRoles.MEMBER },
  },
  { timestamps: true },
);

export type Member = InferSchemaType<typeof MemberSchema>;

export const MemberModel = model<Member>('Member', MemberSchema);

export default MemberModel;
