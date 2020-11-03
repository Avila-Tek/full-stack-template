import * as fs from 'fs';
import schemaComposer from './schemaComposer';
import Query from './Query';
import Mutation from './Mutation';
import CustomMutation from './CustomMutation';
import CustomQuery from './CustomQuery';

schemaComposer.Query.addFields({
  ...Query,
  ...CustomQuery,
});

schemaComposer.Mutation.addFields({
  ...Mutation,
  ...CustomMutation,
});

const schema = schemaComposer.buildSchema();

// Generate GraphQL File for easy access to Types!
fs.writeFileSync(`${process.cwd()}/schema.graphql`, schemaComposer.toSDL());

export default schema;
