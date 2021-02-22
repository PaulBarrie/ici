const schema  = require('./src/schema/schema.js');
const {ApolloServer}= require('apollo-server-express');
const reload = require('express-reload');
const dir = __dirname + "/src";
 
const app = require('express')();
const server = new ApolloServer({schema, context: ({ req }) => {
    return {req};}, 
});
server.graphqlPath = '/graphql';
server.applyMiddleware({ app });
// app.use(reload(dir))
app.listen(3009);
console.log(`🚀 Graphql API is available at http://api.ici.localhost/graphql`);

