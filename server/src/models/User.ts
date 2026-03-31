import mongoose from 'mongoose';

export const USER_ROLES = ['Admin', 'Manager', 'User'] as const;

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    role: { type: String, enum: USER_ROLES, default: 'User' },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

userSchema.index({ role: 1 });

export const User = mongoose.model('User', userSchema);

