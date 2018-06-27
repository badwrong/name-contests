const {
  GraphQLID,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull,
  GraphQLInt
} = require('graphql');


const pgdb = require('../../database/pgdb');
const mdb = require('../../database/mdb');
const ContestType = require('./contest');

module.exports = new GraphQLObjectType({
  name: 'UserType',

  fields: {
    id: { type: GraphQLID },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    fullName: {
      type: GraphQLString,
      resolve: obj => `${obj.firstName} ${obj.lastName}`
    },
    email: { type: new GraphQLNonNull(GraphQLString) },
    createdAt: { type: GraphQLString },
    contests: {
      type: new GraphQLList(ContestType),
      resolve(obj, args, { loaders }) {
        //read from db
        return loaders.contestsForUserIds.load(obj.id);
        // return pgdb(pgPool).getContests(obj);
      }
    },
    contestsCount: {
      type: GraphQLInt,
      resolve(obj, args, { loaders }, { fieldName }) {
        return loaders.mdb.usersByIDs.load(obj.id)
          .then(res => res[fieldName]);
      }
    },
    namesCount: {
      type: GraphQLInt,
      resolve(obj, args, { loaders }, { fieldName }) {
        return loaders.mdb.usersByIDs.load(obj.id)
          .then(res => res[fieldName]);
      }
    },
    votesCount: {
      type: GraphQLInt,
      resolve(obj, args, { loaders }, { fieldName }) {
        return loaders.mdb.usersByIDs.load(obj.id)
          .then(res => res[fieldName]);
      }
    }
  }
});