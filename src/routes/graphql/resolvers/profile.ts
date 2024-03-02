import { Id, Prisma, DataRecord, IProfileInput } from '../types/common.js';

const getProfile = async ({ id }: Id, { prisma }: Prisma) => {
  const profile = await prisma.profile.findUnique({ where: { id } });
  return profile;
};

const getProfiles = async (_: DataRecord, { prisma }: Prisma) => {
  const profiles = await prisma.profile.findMany();
  return profiles;
};

const createProfile = async (
  { dto: data }: { dto: IProfileInput },
  { prisma }: Prisma,
) => {
  try {
    const profile = await prisma.profile.create({ data });
    return profile;
  } catch {
    return null;
  }
};

const changeProfile = async (
  { id, dto: data }: Id & { dto: Partial<IProfileInput> },
  { prisma }: Prisma,
) => {
  try {
    const profile = await prisma.profile.update({
      where: { id },
      data,
    });
    return profile;
  } catch {
    return null;
  }
};

const deleteProfile = async ({ id }: Id, { prisma }: Prisma) => {
  try {
    await prisma.profile.delete({ where: { id } });
    return id;
  } catch {
    return null;
  }
};

export default {
  profile: getProfile,
  profiles: getProfiles,
  createProfile,
  changeProfile,
  deleteProfile,
};
