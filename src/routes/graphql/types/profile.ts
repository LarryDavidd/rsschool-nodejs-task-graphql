import {
  GraphQLBoolean,
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import { MemberTypeIdEnum, MemberType } from './member.js';
import { UUIDType } from './uuid.js';
import { Id, Prisma, DataRecord, IProfileInput } from '../types/common.js';

export interface IProfile extends Id, IProfileInput {}

export const ProfileType = new GraphQLObjectType({
  name: 'profiles',
  fields: () => ({
    id: {
      type: UUIDType,
    },
    isMale: {
      type: GraphQLString,
    },
    yearOfBirth: {
      type: GraphQLString,
    },
    userId: {
      type: UUIDType,
    },
    memberType: {
      type: MemberType,
      resolve: async (source: IProfile, _: DataRecord, { prisma }: Prisma) =>
        await prisma.memberType.findFirst({
          where: { id: { equals: source.memberTypeId } },
        }),
    },
  }),
});

export const CreateProfileInput = new GraphQLInputObjectType({
  name: 'CreateProfileInput',
  fields: {
    isMale: {
      type: GraphQLBoolean,
    },
    yearOfBirth: {
      type: GraphQLInt,
    },
    memberTypeId: {
      type: MemberTypeIdEnum,
    },
    userId: {
      type: UUIDType,
    },
  },
});

export const ChangeProfileInput = new GraphQLInputObjectType({
  name: 'ChangeProfileInput',
  fields: {
    isMale: {
      type: GraphQLBoolean,
    },
    yearOfBirth: {
      type: GraphQLInt,
    },
    memberTypeId: {
      type: MemberTypeIdEnum,
    },
  },
});
