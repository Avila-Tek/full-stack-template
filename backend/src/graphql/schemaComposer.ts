import { SchemaComposer } from 'graphql-compose';
import { ExpressContext } from 'apollo-server-express/dist/ApolloServer';

const schemaComposer = new SchemaComposer<ExpressContext>();

export default schemaComposer;
