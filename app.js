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
      res.send(puzzle(req.query.d));
      break;
    default:
      res.send('OK');
      break;
  }

});

const puzzle = (input) => {
  const map = {
    0:'A',
    1:'B',
    2:'C',
    3:'D'
  }

  const header = /Please\+solve\+this\+puzzle%3A%0A\+/g
  const pattern = /A|B|C|D|\+|\:/g;
  const newlines = /%0A/g;

  let thisPuzzle = decodeURIComponent(input.replace(header, '')).replace(pattern, '').trim().split('\n');

  let thisArray = [];

  for (let i = 0; i < thisPuzzle.length; i++) {
    let row = [];
    for (let j = 0; j < thisPuzzle[i].length; j++) {
      row.push(thisPuzzle[i][j]);
    }
    thisArray.push(row);
  }

  const vars = calculate(thisArray);
  let matrix = vars[0];
  const order = vars[1];

  for (let i = 0; i < order.length; i++) {
    order[i] = map[i];
  }
  console.log(matrix.toString());
  return matrix.toString();
}

const calculate = (arg) => {
  let values = [];
  for (let i = 0; i < arg.length; i++) {
    values[i] = i;
  }
  for (let i = 0; i < arg.length; i++) {
    for (let j = 0; j < arg[i].length; j++) {
      if (i == j) {
        arg[i][j] = '=';
      } else {
        if (arg[i][j] == '<') {
          // let temp = values[i];
          // values[i] = values[j];
          // values[j] = temp;
        } else if (arg[i][j] == '>') {
          // let temp = values[j];
          // values[j] = values[i];
          // values[i] = temp;
        }
      }

      if (arg[i][j] == '-')  {
        arg[i][j] = values[i];
      }
    }
  }

  return [arg, values];
}
//
// const compare = (args, operator) => {
//   if (operator == "<") {
//     args.y = args.x;
//   }
//   return args;
// }


puzzle("Please+solve+this+puzzle%3A%0A+ABCD%0AA---%3C%0AB---%3E%0AC-%3E--%0AD---%3D%0A");
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
