// Imports
const express = require('express');
const userRouter = require('./routes/userRouter');
const app = express();
const cors = require('cors');
const { FRONTEND_URL } = require('./utils/config');

const whiteList = [FRONTEND_URL, 'http://localhost:5173'];

// CORS config
const corsOptions = {
    origin: (origin, callback) => {
        if (whiteList.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
};

// use the cors middleware
app.use(cors(corsOptions));

// Middleware to parse request as json
app.use(express.json());

app.use('/api/v1', userRouter);

module.exports = app;