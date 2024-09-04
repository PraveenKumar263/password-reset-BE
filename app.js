// Imports
const express = require('express');
const userRouter = require('./routes/userRouter');
const app = express();
const cors = require('cors');
const { FRONTEND_URL } = require('./utils/config');

// use the cors middleware
app.use(cors({
    origin: FRONTEND_URL,
    credentials: true
}));

// Middleware to parse request as json
app.use(express.json());

app.use('/api/v1', userRouter);

module.exports = app;