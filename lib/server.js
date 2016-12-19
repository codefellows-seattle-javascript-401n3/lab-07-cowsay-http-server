'use strict';

const http = require('http');
const cowsay = require('cowsay');
const url = require('url');
const queryString = require('querystring');
const parseBody = require('../lib/parse-body');
const PORT = process.env.PORT || 3000;

const server = http.createServer(function(req, res){
  req.url = url.parse(req.url);
  req.url.query = queryString.parse(req.url.query);

  console.log(req.url);

  if(req.method === 'GET' && req.url.pathname === '/') {
    res.writeHead(200, {'Content-Type' : 'text/plain'});
    res.write(cowsay.say({text : 'hello world\n'}));
    res.end();
  }
  if(req.method === 'GET' && req.url.pathname === '/cowsay'){
    let message = req.url.query.text;
    console.log(message);
    if(message){
      res.writeHead(200, {'Content-Type' : 'text/plain'});
      res.write(cowsay.say({text: message, f: 'tux'}));
    } else {
      res.writeHead(400, {'Content-Type' : 'text/plain'});
      res.write(cowsay.say({text: 'bad request\ntry: localhost:3000/cowsay?text=howdy'}) + '\n');
    }
    res.end();
  }
  if(req.method === 'POST'){
    parseBody(req, function(err){
      if(err) return console.log(err);
      console.log(req.body);
      if(req.body.text){
        res.writeHead(200, {'Content-Type' : 'text/plain'});
        res.write(cowsay.say({text: req.body.text}) + '\n');
      } else {
        res.writeHead(400, {'Content-Type' : 'text/plain'});
        res.write(cowsay.say({text: 'bad request\ntry: localhost:3000/cowsay?text=howdy'}) + '\n');
      }
      res.end();
    });
  }
});

server.listen(PORT, () => {
  console.log('serving port 3000');
});
