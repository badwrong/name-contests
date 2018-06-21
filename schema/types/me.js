const {
  GraphQLID,
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull
} = require('graphql');

module.exports = new GraphQLObjectType({
  name: 'MeType',

  fields: {
    id: { type: GraphQLID },
    email: { type: new GraphQLNonNull(GraphQLString) }
  }
})