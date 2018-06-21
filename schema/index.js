// Import type helpers from graphql-js
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull
} = require('graphql');


const MeType = require('./types/me');

// The root query type is where in the data graph
// we can start asking questions
const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',

  fields: {
    me: {
      type: MeType,
      description: 'Blah blah',
      args: {
        key: {type: new GraphQLNonNull(GraphQLString)}
      },
      resolve: () => {}
    }
  }
});

const ncSchema = new GraphQLSchema({
  query: RootQueryType
  // mutation: ...
});

module.exports = ncSchema;
