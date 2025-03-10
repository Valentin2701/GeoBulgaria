import { User } from "../models/User.js";
import * as jwt from "../lib/jsonwebtoken.js";
import bcrypt from "bcrypt";

export const register = async (userData) => {
  const user = await User.create(userData);

  const token = await jwt.sign(
    { _id: user._id, username: user.username, email: user.email },
    process.env.SECRET_KEY
  );

  return { user, token };
};

export const login = async (userData) => {
  const user = await User.findOne({ email: userData.email });

  if (!user) throw new Error("Email or password incorrect!");

  const isValid = await bcrypt.compare(userData.password, user.password);
  if (!isValid) throw new Error("Email or password incorrect!");
  
  const token = await jwt.sign(
    { _id: user._id, username: user.username, email: user.email },
    process.env.SECRET_KEY
  );

  return { user, token };
};

export const getUser = (id) => User.findById(id);
