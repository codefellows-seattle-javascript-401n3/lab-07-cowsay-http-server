'use strict';

const fs = require('fs');
const http = require('http');
const url = require('url');
const queryString = require('querystring');

const PORT = process.env.PORT || 3000;
const cowsay = require('cowsay');
const parseBody = require('./lib/parse-body.js');

const server = http.createServer(function(req, res) {
  req.url = url.parse(req.url);
  req.url.query = queryString.parse(req.url.query);
  // console.log('req.url', req.url);
  res.write(cowsay.say({text: 'Hell, low whirled.'}));

  if(req.method === 'POST') {
    parseBody(req, function(err) {
      if(err) return console.error(err);
    });
  }
  if(req.method === 'GET' && req.url.pathname === '/cowsay') {
    fs.createReadStream('./server.js').pipe(res);
  }
  else {
    res.statusCode = 404;
    res.write(' error: machine on fire, run! ');
    res.end();
  }
});

server.listen(PORT, function() {
  console.log('server running on port:', PORT);
});
