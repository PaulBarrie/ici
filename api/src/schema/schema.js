const {loadFilesSync} = require('@graphql-tools/load-files');
const  {mergeResolvers, mergeTypeDefs} = require('@graphql-tools/merge')
const { makeExecutableSchema }= require('@graphql-tools/schema');
const path=require("path");



const typeDefs = mergeTypeDefs(loadFilesSync(path.join(__dirname, './graphql')))
const resolvers = mergeResolvers(loadFilesSync(path.join(__dirname, './resolvers')))
const formatError = (err) => {
    const error = getErrorCode(err.message)
    return ({ message: error.message, statusCode: error.statusCode })
}

const schema = makeExecutableSchema({typeDefs, resolvers, formatError})

module.exports = schema;

