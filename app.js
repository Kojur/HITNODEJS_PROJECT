require('dotenv').config();
const express = require('express');
const createError = require('http-errors');
const mongoose = require('mongoose');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Routes
const indexRouter = require('./routes/index');
const userRouter = require('./routes/users');
const costRouter = require('./routes/costs');
const aboutRouter = require('./routes/about');

// Instances
const app = express()
app.use(express.json());
app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// documentation config
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Expense Manager API",
      version: "1.0.0",
      description: "API for managing user expenses",
    },
  },
  apis: ["./routes/*.js"],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Routes Prefix
app.use('/api/about', aboutRouter);
app.use('/api/users', userRouter);
app.use('/api', costRouter);
app.use('/', indexRouter);

// MongoDB Connection
mongoose.Promise = global.Promise;
const mongoURI = process.env.MONGO_URI;
if (!mongoURI) {
  console.error('Error: MONGO_URI is not defined in the environment variables.');
  process.exit(1);
}

mongoose.connect(mongoURI)
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => console.error('MongoDB connection error:', err));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
// error handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500).json({
    error: err.message || "Internal Server Error"
  });
});

module.exports = app;