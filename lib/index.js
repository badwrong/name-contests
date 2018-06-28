const { nodeEnv } = require('./util');
console.log(`Running in ${nodeEnv} mode...`);

const DataLoader = require('dataloader');
const pg = require('pg');
const pgConfig = require('../config/pg')[nodeEnv];
const pgPool = new pg.Pool(pgConfig);
const pgdb = require('../database/pgdb')(pgPool);

const app = require('express')();

const ncSchema = require('../schema');
const graphqlHTTP = require('express-graphql');

const { MongoClient, Logger } = require('mongodb');
const assert = require('assert');
const mConfig = require('../config/mongo')[nodeEnv];

MongoClient.connect(mConfig.url, (err, mPool) => {
  assert.equal(err, null);

  Logger.setLevel('debug');
  Logger.filter('class', ['Server']);

  const mdb = require('../database/mdb')(mPool);

  app.use('/graphql', (req, res) => {
    const loaders = {
      usersByIds: new DataLoader(pgdb.getUsersByIds),
      usersByApiKeys: new DataLoader(pgdb.getUsersByApiKeys),
      contestsForUserIds: new DataLoader(pgdb.getContestsForUserIds),
      namesForContests: new DataLoader(pgdb.getNamesForContests),

      // create view in postgres

      // create view total_votes_by_name as
      // select id as name_id,
      //   (select count(up) from votes v where v.name_id = n.id and up = true) as up,
      //   (select count(up) from votes v where v.name_id = n.id and up = false) as down
      // from names n;

      totalVotesByNameIds: new DataLoader(pgdb.getTotalVotesByNameIds),
      mdb: {
        usersByIDs: new DataLoader(mdb.getUsersByIDs)
      }
    };

    graphqlHTTP({
      schema: ncSchema,
      graphiql: true,
      context: { pgPool, mPool, loaders }
    })(req, res);
  });
  
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
});


