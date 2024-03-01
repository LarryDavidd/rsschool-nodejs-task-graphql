import { PrismaClient } from '@prisma/client';

export const userBatchLoader =
  (prisma: PrismaClient) => async (ids: readonly string[]) => {
    const users = await prisma.user.findMany({
      where: { id: { in: ids as string[] } },
      include: { userSubscribedTo: true, subscribedToUser: true },
    });

    return ids.map(
      (id) =>
        users.reduce((acc, user) => {
          acc[user.id] = user;
          return acc;
        }, {})[id],
    );
  };
