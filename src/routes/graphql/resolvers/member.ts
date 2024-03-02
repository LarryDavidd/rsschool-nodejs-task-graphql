import { Id, Prisma, DataRecord } from '../types/common.js';

export const getMemberType = async ({ id }: Id, { prisma }: Prisma) => {
  const member = await prisma.memberType.findUnique({ where: { id } });
  return member;
};

const getMemberTypes = async (_: DataRecord, { prisma }: Prisma) => {
  const members = await prisma.memberType.findMany();
  return members;
};

export default {
  memberType: getMemberType,
  memberTypes: getMemberTypes,
};
