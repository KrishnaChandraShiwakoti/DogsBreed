const express = require('express');
const morgan = require('morgan');
const dogsRouter = require('./routes/dogsRoutes');
const cors = require('cors');

const app = express();
app.use(morgan('dev'));
app.use(express.json());
const allowedOrigins = ['http://localhost:5173', 'http://localhost:5174'];
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  })
);
app.use('/api/v1/dogs', dogsRouter);

module.exports = app;
