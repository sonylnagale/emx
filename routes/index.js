var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  switch (req.query.q) {
    'Name':
      res.send('Sonyl Nagale');
    break;
    default:
      res.send("OK");
      break;
  }
});

module.exports = router;
