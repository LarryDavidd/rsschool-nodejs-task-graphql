import { Type } from '@fastify/type-provider-typebox';
import {
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLList,
  GraphQLString,
} from 'graphql';
import { UUIDType } from './types/uuid.js';
import { UserType, CreateUserInputType, ChangeUserInputType } from './types/user.js';
import { ChangeProfileInput, CreateProfileInput, ProfileType } from './types/profile.js';
import { MemberType, MemberTypeIdEnum } from './types/member.js';
import { ChangePostInput, CreatePostInput, PostType } from './types/post.js';

export const gqlResponseSchema = Type.Partial(
  Type.Object({
    data: Type.Any(),
    errors: Type.Any(),
  }),
);

export const createGqlResponseSchema = {
  body: Type.Object(
    {
      query: Type.String(),
      variables: Type.Optional(Type.Record(Type.String(), Type.Any())),
    },
    {
      additionalProperties: false,
    },
  ),
};

const query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    user: {
      type: new GraphQLList(UserType),
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
      },
    },
    users: {
      type: new GraphQLList(UserType),
      args: {},
    },
    memberType: {
      type: MemberType,
      args: { id: { type: MemberTypeIdEnum } },
    },
    memberTypes: {
      type: new GraphQLList(MemberType),
      args: {},
    },
    profile: {
      type: ProfileType,
      args: { id: { type: UUIDType } },
    },
    profiles: {
      type: new GraphQLList(ProfileType),
      args: {},
    },
    post: {
      type: PostType,
      args: { id: { type: UUIDType } },
    },
    posts: {
      type: new GraphQLList(PostType),
      args: {},
    },
  },
});

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createUser: {
      type: UserType,
      args: {
        dto: { type: CreateUserInputType },
      },
    },
    deleteUser: {
      type: UUIDType,
      args: {
        id: { type: UUIDType },
      },
    },
    changeUser: {
      type: UserType,
      args: {
        id: { type: UUIDType },
        dto: { type: ChangeUserInputType },
      },
    },
    createProfile: {
      type: ProfileType,
      args: {
        dto: { type: CreateProfileInput },
      },
    },
    deleteProfile: {
      type: UUIDType,
      args: {
        id: { type: UUIDType },
      },
    },
    changeProfile: {
      type: ProfileType,
      args: {
        id: { type: UUIDType },
        dto: { type: ChangeProfileInput },
      },
    },
    subscribeTo: {
      type: UserType,
      args: {
        userId: { type: UUIDType },
        authorId: { type: UUIDType },
      },
    },
    unsubscribeFrom: {
      type: GraphQLString,
      args: {
        userId: { type: UUIDType },
        authorId: { type: UUIDType },
      },
    },
    createPost: {
      type: PostType,
      args: {
        dto: { type: CreatePostInput },
      },
    },
    deletePost: {
      type: UUIDType,
      args: {
        id: { type: UUIDType },
      },
    },
    changePost: {
      type: PostType,
      args: {
        id: { type: UUIDType },
        dto: { type: ChangePostInput },
      },
    },
  },
});

export const schema = new GraphQLSchema({ query, mutation });
