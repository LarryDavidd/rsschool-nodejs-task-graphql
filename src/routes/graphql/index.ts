import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { createGqlResponseSchema, gqlResponseSchema, schema } from './schemas.js';
import userResolver from './resolvers/user.js';
import profileResolver from './resolvers/profile.js';
import memberResolver from './resolvers/member.js';
import memberPost from './resolvers/post.js';

import { graphql, parse, validate } from 'graphql';

import depthLimit from 'graphql-depth-limit';

const plugin: FastifyPluginAsyncTypebox = async (fastify) => {
  const { prisma } = fastify;

  fastify.route({
    url: '/',
    method: 'POST',
    schema: {
      ...createGqlResponseSchema,
      response: {
        200: gqlResponseSchema,
      },
    },

    async handler(req) {
      const { query, variables } = req.body;

      const errors = validate(schema, parse(query), [depthLimit(5)]);
      if (errors.length) return { errors };

      return await graphql({
        schema,
        source: query,
        rootValue: {
          ...userResolver,
          ...profileResolver,
          ...memberResolver,
          ...memberPost,
        },
        variableValues: variables,
        contextValue: { prisma },
      });
    },
  });
};

export default plugin;
