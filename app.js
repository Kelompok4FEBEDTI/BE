var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var cors = require('cors')


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var memberparkirRouter = require('./routes/memberparkirRouter');
var authRouter = require('./routes/auth');
var penjagaRouter = require('./routes/penjagaRouter');
var transaksiRouter = require('./routes/transaksiRouter');
const spotparkirRouter = require('./routes/spotparkirRouter');

var memberparkir = require('./models/memberparkir');
var Spotparkir = require('./models/spotparkir');
var Transaksi = require('./models/transaksi');

var app = express();
//var uri = process.env.MONGODB_URI;
var uri = "mongodb://localhost:27017/SiPaDi";
app.use(cors());

const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  family: 4 // Use IPv4, skip trying IPv6
};
var connect = mongoose.connect(uri, options);
connect.then((db) => {
  console.log(db);
  console.log('Berhasil connect Mongo DB');
}, (err) => {
  console.log('Hai Error DB:' + err);
  console.log(`${process.env.DBNAME}`);
}).catch(err => {
  console.log(err, 'Erorrrrrrrrrrrrrrrr');
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/member', memberparkirRouter);
app.use('/spotparkir', spotparkirRouter);
app.use('/auth', authRouter);
app.use('/penjaga', penjagaRouter);
app.use('/transaksi', transaksiRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
