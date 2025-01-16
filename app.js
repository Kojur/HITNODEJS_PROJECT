// const createError = require('http-errors');
// const express = require('express');
// const path = require('path');
// const cookieParser = require('cookie-parser');
// const logger = require('morgan');
// const db = require('db');
//
// const app = express();
//
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'pug');
//
// const costRoutes = require('./routes/costs');
// const userRoutes = require('./routes/users');
// const aboutRoutes = require('./routes/about');
//
// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
//
// app.use('/api', costRoutes);
// app.use('/api/users', userRoutes);
// app.use('/api/about', aboutRoutes);
//
// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });
//
// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};
//
//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });
//
// module.exports = app;

// library
const express = require('express');
const mongoose = require('mongoose');

// Routes
const userRouter = require('./routes/users');
const costRouter = require('./routes/costs');

// Instances
const PORT = 3000;
const app = express()
app.use(express.json());

// Routes Prefix
app.use('/api/users', userRouter);
app.use('/api', costRouter);

// MongoDB Connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://127.0.0.1:27017/webstore' , {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;