import DataLoader from 'dataloader';
import { PrismaClient, User } from '@prisma/client';
import { userBatchLoader } from './batchs.js';

interface DataLoaders {
  userLoader: DataLoader<string, User>;
}

const createDataLoaders = (prisma: PrismaClient): DataLoaders => ({
  userLoader: new DataLoader(userBatchLoader(prisma)),
});

export default createDataLoaders;
