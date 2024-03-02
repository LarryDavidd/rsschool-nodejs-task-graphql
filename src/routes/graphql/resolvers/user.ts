import {
  Id,
  Prisma,
  DataRecord,
  IUserInput,
  ISubscriptionInput,
} from '../types/common.js';

const getUser = async ({ id }: Id, { prisma }: Prisma) => {
  return await prisma.user.findUnique({ where: { id } });
};

const getAllUsers = async (_: DataRecord, { prisma }: Prisma) => {
  return await prisma.user.findMany();
};

const createUser = async ({ dto: data }: { dto: IUserInput }, { prisma }: Prisma) => {
  return await prisma.user.create({ data });
};

const deleteUser = async ({ id }: Id, { prisma }: Prisma) => {
  try {
    await prisma.user.delete({ where: { id } });
    return id;
  } catch (error) {
    console.log(`Not able to delete user id = ${id}`);
  }
};

const changeUser = async (
  { id, dto: data }: Id & { dto: Partial<IUserInput> },
  { prisma }: Prisma,
) => {
  try {
    const user = await prisma.user.update({ where: { id }, data });
    return user;
  } catch (error) {
    console.log(`Not able to change user id = ${id}`);
  }
};

const subscribeTo = async (
  { userId: id, authorId }: ISubscriptionInput,
  { prisma }: Prisma,
) => {
  try {
    const user = prisma.user.update({
      where: { id },
      data: { userSubscribedTo: { create: { authorId } } },
    });
    return user;
  } catch {
    return null;
  }
};

const unsubscribeFrom = async (
  { userId: subscriberId, authorId }: ISubscriptionInput,
  { prisma }: Prisma,
) => {
  try {
    await prisma.subscribersOnAuthors.delete({
      where: { subscriberId_authorId: { subscriberId, authorId } },
    });
  } catch {
    return null;
  }
};

export default {
  user: getUser,
  users: getAllUsers,
  createUser: createUser,
  deleteUser: deleteUser,
  changeUser: changeUser,
  subscribeTo: subscribeTo,
  unsubscribeFrom: unsubscribeFrom,
};
