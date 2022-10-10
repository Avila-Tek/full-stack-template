/* eslint-disable import/newline-after-import */
/* eslint-disable import/first */
import { schemaComposer } from 'graphql-compose';

import Query from './Query';
import Mutation from './Mutation';

schemaComposer.Query.addFields({
  ...Query,
});

schemaComposer.Mutation.addFields({
  ...Mutation,
});

const schema = schemaComposer.buildSchema();

export default schema;
