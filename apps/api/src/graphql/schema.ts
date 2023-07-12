import { schemaComposer } from 'graphql-compose';
import { GraphQLDirective } from 'graphql';
import { GraphQLBoolean, GraphQLInt, GraphQLEnumType } from 'graphql/type';

import { Query } from './Query';
import { Mutation } from './Mutation';

schemaComposer.Query.addFields({
  ...Query,
});

schemaComposer.Mutation.addFields({
  ...Mutation,
});

const CacheControlScopeEnum = new GraphQLEnumType({
  name: 'CacheControlScope',
  values: {
    PUBLIC: { value: 'PUBLIC' },
    PRIVATE: { value: 'PRIVATE' },
  },
});

schemaComposer.addDirective(
  new GraphQLDirective({
    name: 'cacheControl',
    locations: ['FIELD_DEFINITION', 'OBJECT', 'INTERFACE', 'UNION'] as any[],
    args: {
      maxAge: {
        type: GraphQLInt,
      },
      scope: {
        type: CacheControlScopeEnum,
      },
      inheritMaxAge: {
        type: GraphQLBoolean,
      },
    },
  })
);

export const schema = schemaComposer.buildSchema();
