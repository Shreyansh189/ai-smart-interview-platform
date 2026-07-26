import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    credits: {
      type: Number,
      default: 300,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;