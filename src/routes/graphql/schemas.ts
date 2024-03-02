import { Type } from '@fastify/type-provider-typebox';
import { GraphQLNonNull, GraphQLObjectType, GraphQLSchema, GraphQLList } from 'graphql';
import { UUIDType } from './types/uuid.js';
import { UserType, CreateUserInputType, ChangeUserInputType } from './types/user.js';

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
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
      },
    },
    users: {
      type: new GraphQLList(UserType),
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
  },
});

export const schema = new GraphQLSchema({ query, mutation });
