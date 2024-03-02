import {
  GraphQLFloat,
  GraphQLInputObjectType,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
} from 'graphql';
import { UUIDType } from './uuid.js';
import { ProfileType } from './profile.js';
import { DataRecord, Id, Prisma, IUserInput } from './common.js';

export interface IUser extends Id, IUserInput {}

export const UserType: GraphQLObjectType = new GraphQLObjectType({
  name: 'users',
  fields: () => ({
    id: {
      type: UUIDType,
    },
    name: {
      type: GraphQLString,
    },
    balance: {
      type: GraphQLFloat,
    },
    profile: {
      type: ProfileType,
      resolve: async (source: IUser, _: DataRecord, { prisma }: Prisma) =>
        await prisma.profile.findFirst({
          where: { userId: source.id },
        }),
    },
    subscribedToUser: {
      type: new GraphQLList(UserType),
      resolve: async (source: IUser, _: DataRecord, { prisma }: Prisma) =>
        await prisma.user.findMany({
          where: {
            userSubscribedTo: { some: { authorId: source.id } },
          },
        }),
    },
    userSubscribedTo: {
      type: new GraphQLList(UserType),
      resolve: async (source: IUser, _: DataRecord, { prisma }: Prisma) =>
        await prisma.user.findMany({
          where: {
            subscribedToUser: { some: { subscriberId: source.id } },
          },
        }),
    },
  }),
});

export const CreateUserInputType = new GraphQLInputObjectType({
  name: 'CreateUserInput',
  fields: {
    name: {
      type: GraphQLString,
    },
    balance: {
      type: GraphQLFloat,
    },
  },
});

export const ChangeUserInputType = new GraphQLInputObjectType({
  name: 'ChangeUserInput',
  fields: {
    name: {
      type: GraphQLString,
    },
    balance: {
      type: GraphQLFloat,
    },
  },
});
