const {ApolloServer}= require("apollo-server-express");
const {typeDefs}=require("./Schema/TypeDefs");
const {resolvers}=require("./Schema/Resolvers");
const express = require('express');

// await server.start();

// const app=express();
// const server= new ApolloServer({typeDefs,resolvers});

// server.applyMiddleware({app});

// app.listen({port:4000},()=>{
//     console.log("server running");
// })

async function startApolloServer() {
    const server = new ApolloServer({ typeDefs, resolvers });
  
    await server.start();
  
    const app = express();
  
    server.applyMiddleware({ app });
  
    app.listen({ port: 4000 }, () =>
      console.log(`Server running at http://localhost:4000${server.graphqlPath}`)
    );
  }
  

  startApolloServer().catch((error) => {
    console.error('Error starting Apollo Server:', error);
  });