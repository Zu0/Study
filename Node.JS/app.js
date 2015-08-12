var async = require('async');
var logger = require('./logger');

var http = require('http');
var express = require('express');
var app = express();

var port = 5203;

logger.info('------------------ Start ------------------');
http.createServer(app).listen(port, function() {
    logger.info('Web server listening on port ' + port);
});