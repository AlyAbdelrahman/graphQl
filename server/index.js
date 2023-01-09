require('dotenv').config();
const colors = require('colors');
const connectDB = require('./config/db');
const schema = require('./schema/shema');
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const port = process.env.PORT || 5000;
const app = express();

//Connect to DB
connectDB();

app.use(
    '/graphql',
    graphqlHTTP({
     schema,
     graphiql: process.env.NODE_ENV === 'development'
    })
);
app.listen(port, console.log(`>>test${port}`))
