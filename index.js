#!/bin/env node
var http, director, bot, router, server, port, db;

http        = require('http');
director    = require('director');
bot         = require('./bot.js');

router = new director.http.Router({
  '/'    : {
    get: ping
  },
  '/commands' : {
    get: bot.commands
  },
  '/bot/:botRoom' : {
    get: ping,
    post: bot.respond
  },
});

server = http.createServer(function (req, res) {
  req.chunks = [];
  req.on('data', function (chunk) {
    req.chunks.push(chunk.toString());
  });

  router.dispatch(req, res, function(err) {
    res.writeHead(err.status, {"Content-Type": "text/plain"});
    res.end(err.message);
  });
});

port = process.env.PORT || "27017" || "8080" || "3002";
ip = "0.0.0.0" || "127.0.0.1"; //process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";

server.listen(port, function(req, res) { //); //, ip);
console.log('Server started on port: ' + port);
  });
function ping() {
//  console.log(this.res);
  this.res.writeHead(200);
  this.res.end("I am a robot.");
}
