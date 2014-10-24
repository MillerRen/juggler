var express = require('express');
var path = require('path');

var app = express();

// marker for `grunt-express` to inject static folder/contents
app.use(function staticsPlaceholder(req, res, next) {
  return next();
});

app.use('/bower_components',express.static('./bower_components'))

//app.use(express.cookieParser());
//app.use(express.session({ secret: 'i am not telling you' }));
//app.use(express.bodyParser());


module.exports = app;