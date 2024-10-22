require('dotenv').config({ path: './.env' });
const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const path = require('path');
const cors = require('cors');


const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');
const { authMiddleware } = require('./utils/auth');

const PORT = process.env.PORT || 3001;
const app = express();
app.use(cors());
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: authMiddleware
});

const startApolloServer = async () => {
    await server.start();

    app.use(express.urlencoded({ extended: true}));
    app.use(express.json());

    app.use('/graphql', expressMiddleware(server));

    if (process.env.NODE_ENV === 'production') {
        app.use(express.static(path.join(__dirname, '../client/dist')));

        app.get('*', (req, res) => {
            res.sendFile(path.join(__dirname, '../client/dist/index.html'));
        });
    }

    db.once('open', () => {
        app.listen(PORT, () => {
            console.log(`API server running on port ${PORT}!`);
            console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
        })
    });
};

startApolloServer();