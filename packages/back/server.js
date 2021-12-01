const { GraphQLServer } = require( 'graphql-yoga')


const typeDefs = require("./schema");
const resolvers = require("./resolvers");


const PORT = 7000


const server = new GraphQLServer({
  typeDefs,
  resolvers
  
})

server.start({port: PORT}, ({port}) => console.log('Server is running on http://localhost:' + port))









