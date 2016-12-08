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

  console.log('req.url', req.url);

  if(req.method === 'GET' && req.url.pathname === '/') {
    res.writeHead(200, {'Content-Type' : 'text/plain'});
    res.write(cowsay.say({text: 'Hello world, single slash\n.'}));
  }
  if(req.method === 'GET' && req.url.pathname === '/cowsay') {
    let say = req.url.query.text;
    console.log(say);
    if(say) {
      res.writeHead(200,{'Content-Type': 'text/plain'});
      res.write(cowsay.say({text: say, f: 'elephant'}));
    } else {
      res.writeHead(400, {'Content-Type': 'text/plain'});
      res.write(cowsay.say({text: 'bad request\n try:localhost:3000/cowsay?text=say'}) + '\n');
    }
    res.end();
  }

  if(req.method === 'POST') {
    parseBody(req, function(err) {
      if(err) return console.error(err);
      console.log(req.body);
      if(req.body.text) {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.write(cowsay({text: req.body.text}) + '\n');
      } else {
        res.writeHead(400, {'Content-Type': 'text/plain'});
        res.write(cowsay.say({text: 'bad request\n try:localhost:3000/cowsay?text=where+am+I'}) + '\n');
      }
      res.end();
    });
  }
});

server.listen(PORT, function() {
  console.log('server running on port:', PORT);
});
