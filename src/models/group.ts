import { InferSchemaType, Schema, model } from 'mongoose';

const groupSchema = new Schema(
  {
    name: { type: String, required: true },
    preferences: { type: Object, default: {} },
  },
  { timestamps: true },
);

export type Group = InferSchemaType<typeof groupSchema>;

export const GroupModel = model<Group>('Group', groupSchema);

export default GroupModel;
