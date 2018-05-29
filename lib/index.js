const { nodeEnv } = require('./util');
console.log(`Running in ${nodeEnv} mode...`);

const app = require('express')();

const ncSchema = require('../schema');
const graphqlHTTP = require('express-graphql');

app.use('/graphql', graphqlHTTP({
    schema: ncSchema,
    graphiql: true
}))

const PORT = process.env.port || 3000;
app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`);
});