import { PrismaClient } from '@prisma/client';

export type Id = {
  id: string;
};

export type Prisma = {
  prisma: PrismaClient;
};

export type DataRecord = Record<string | number | symbol, never>;

export interface IProfileInput {
  isMale: boolean;
  yearOfBirth: number;
  memberTypeId: string;
  userId: string;
}

export interface IUserInput {
  name: string;
  balance: number;
}

export interface ISubscriptionInput {
  userId: string;
  authorId: string;
}

export interface IPostInput {
  title: string;
  content: string;
  authorId: string;
}
