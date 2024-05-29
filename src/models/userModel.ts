import { InferSchemaType, Schema, model } from 'mongoose';
import { UserRoles } from '../config/roles';

const userSchema = new Schema(
  {
    email: { type: String, required: true, trim: true, unique: true },
    username: { type: String, required: true, trim: true },
    password: { type: String, required: true, select: false },
    role: { type: String, default: UserRoles.USER },
    preferences: { type: Object, default: {} },
  },
  { timestamps: true },
);

export type User = InferSchemaType<typeof userSchema>;

export const UserModel = model<User>('User', userSchema);

export default UserModel;
