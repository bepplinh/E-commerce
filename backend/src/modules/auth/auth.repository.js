import prisma from "../../config/prisma.js";

const findUserByEmailOrUsername = async (email, username) => {
  return prisma.user.findFirst({
    where: {
      OR: [{ email }, { username }],
    },
  });
};

const findUserByEmail = async (email) => {
  return prisma.user.findUnique({
    where: { email },
  });
};

const createUser = async (data) => {
  return prisma.user.create({
    data,
  });
};

export default {
  findUserByEmailOrUsername,
  findUserByEmail,
  createUser,
};
