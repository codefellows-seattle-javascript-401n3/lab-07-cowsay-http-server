'use strict';

const expect = require('chai').expect;
const request = require('superagent');
const cowsay = require('cowsay');

require('../server.js');

describe('Testing The Cowsay', function() {
  describe('/GET Route', function() {
    it('will display Hello World at / ', function(done) {
      request.get('localhost:3000')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.text).to.equal('Hello World\n');
        done();
      });
    });
    it('will have a cow saying Eat More Chikin', function(done) {
      request.get('localhost:3000/cowsay?text=Eat-Mor-Chikin')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.text).to.equal(cowsay.say({text: 'Eat-Mor-Chikin'}));
        done();
      });
    });
  });
});