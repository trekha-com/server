import { InferSchemaType, Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true },
    authentication: {
      password: { type: String, required: true, select: false },
      salt: { type: String, required: true, select: false },
      sessionToken: { type: String, select: false },
    },
    isAdmin: { type: Boolean, default: false },
    preferences: { type: Object, default: {} },
  },
  { timestamps: true },
);

export type User = InferSchemaType<typeof userSchema>;

export const UserModel = model<User>('User', userSchema);

export default UserModel;
