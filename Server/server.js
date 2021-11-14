const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require("mongoose");
const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');
const { authMiddleware } = require('./utils/auth');
const path = require('path');


// const app = express();
const PORT = process.env.PORT || 3000;

async function startApolloServer(typeDefs, resolvers) {
  const server = new ApolloServer({ typeDefs, resolvers, context: authMiddleware })
  const app = express();
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  await server.start();
  server.applyMiddleware({ app, path: '/graphql' });

  // if we're in production, serve client/build as static assets
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
  }

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
  });


  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    });
  });
}

startApolloServer(typeDefs, resolvers);