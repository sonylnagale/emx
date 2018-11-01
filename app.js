const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const index = require('./routes/index');
const users = require('./routes/users');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Function to handle the root path
app.get('/', async function(req, res) {
  let query = req.query.q;
  console.log(query);
  switch (query) {
    case 'Name':
      res.send('Sonyl Nagale');
      break;
    case 'Email Address':
      res.send('sonyl@nagale.com');
      break;
    case 'Years':
      res.send('>15');
      break;
    case 'Referrer':
      res.send('Jenny Gasparis');
      break;
    case 'Degree':
      res.send('BFA, Graphic Design; BA, Philosophy');
      break;
    case 'Position':
      res.send('JavaScript Architect/Team Lead');
      break;
    case 'Phone':
      res.send('323.793.3369');
      break;
    case 'Status':
      res.send('Yes');
      break;
    case 'Resume':
      res.send('https://www.dropbox.com/s/kz9kbroqs74dn16/sonyl_nagale_resume_2018.3.pdf?dl=0');
      break;
    case 'Puzzle':
      res.send('ABCD\nA=<<<\n\B>=<>\nC>>=>\nD><<=')
        break;
    default:
      res.send('OK');
      break;
  }

});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
