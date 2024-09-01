// Imports
const express = require('express');
const userRouter = require('./routes/userRouter');
const app = express();

// Middleware to parse request as json
app.use(express.json());

app.use('/api/v1', userRouter);

module.exports = app;