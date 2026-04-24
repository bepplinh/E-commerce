import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import authRepository from "./auth.repository.js";
import { ConflictError, UnauthorizedError } from "../../utils/app-error.js";

const register = async (userData) => {
  const { username, email, password, phone, fullName } = userData;

  const existingUser = await authRepository.findUserByEmailOrUsername(
    email,
    username,
  );
  if (existingUser) {
    throw new ConflictError("User with email or username already exists");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = await authRepository.createUser({
    username,
    email,
    password: hashedPassword,
    phone,
    fullName,
  });

  return {
    id: newUser.id,
    username: newUser.username,
    email: newUser.email,
    fullName: newUser.fullName,
  };
};

const login = async (email, password) => {
  const user = await authRepository.findUserByEmail(email);
  if (!user) {
    throw new UnauthorizedError("Invalid credentials");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new UnauthorizedError("Invalid credentials");
  }

  const secret = process.env.JWT_SECRET || "fallback_secret";
  const token = jwt.sign({ id: user.id, email: user.email }, secret, {
    expiresIn: process.env.JWT_EXPIRES_IN || "1d",
  });

  return {
    token,
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
      fullName: user.fullName,
    },
  };
};

export { register, login };
