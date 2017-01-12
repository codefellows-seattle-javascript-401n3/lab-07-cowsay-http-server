'use strict';

// Assign Goblal Vars
const http = require('http');
const url = require('url');
const queryString = require('querystring');

const parseBody = require('./lib/bodyParser.js');

const cowsay = require('cowsay');


const PORT = process.env.PORT || 3000;  //usr def or 3000


// Create the server request
const server = http.createServer(function(req, res) {
  req.url = url.parse(req.url);
  req.url.query = queryString.parse(req.url.query);

  if(req.url.pathname === '/') {
    res.writeHead(200,
      {'Content-Type': 'text/plain'});
    res.write('Hello World\n');
    res.end();
    return;
  }

  // GET REQUEST
  if (req.method === 'GET' && req.url.pathname ==='/cowsay') {
    let queryCowText = req.url.query.text;

    if (queryCowText) {

      res.writeHead(200,
        {'Content-Type': 'text/plain'});
      res.write(cowsay.say({
        text: queryCowText,
        f: req.url.query.text.f,
      }));

    } else {
      res.writeHead(400,
        {'Content-Type': 'text/plain'});
      res.write(cowsay.say({
        text: 'Error 400\ntry: localhost:3000/cowsay?text=howdy\n',
        f:'dragon',
      }));
    }
    res.end();
    return;
  }

// POST REQUEST
  if(req.method === 'POST' && req.url.pathname ==='/cowsay') {
    parseBody(req, function(err) {
      if(err) return console.error(err);
      let message = req.body.text;
      if(message) {
        res.writeHead(200,
          {'Content-Type': 'text/plain'});
        res.write(cowsay.say({
          text: message
        }));

      } else {
        res.writeHead(400, {'Content-Type': 'text/plain'});
        res.write(cowsay.say({
          text: 'Error 400\ntry: localhost:3000/cowsay?text=howdy',
          f: 'dragon',
        }));
      }
      res.end();
      return;
    });
  }
});

server.listen(PORT, function() {
  console.log('The server is now listening d(- -)b  on', PORT);
});









