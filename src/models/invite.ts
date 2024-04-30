import { InferSchemaType, Schema, model } from 'mongoose';

const inviteSchema = new Schema(
  {
    group: { type: Schema.Types.ObjectId, ref: 'Group', required: true },
    token: { type: String, required: true },
    maxUses: { type: Number },
    expirationDate: { type: String },
  },
  { timestamps: true },
);

export type Invite = InferSchemaType<typeof inviteSchema>;

export const InviteModel = model<Invite>('Invite', inviteSchema);

export default InviteModel;
