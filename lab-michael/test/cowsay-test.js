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
    it('will have Error 400 dragon when syntax is incorrect', function(done) {
      request.get('localhost:3000/cowsay')
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.text).to.equal(cowsay.say({
          text: 'Error 400\ntry: localhost:3000/cowsay?text=howdy\n',
          f:'dragon',
        }));
        done();
      });
    });
    it('will have Error 404 Ghostbusters when using wrong route', function(done) {
      request.get('localhost:3000/co')
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.text).to.equal(cowsay.say({
          text: 'ERROR 404!!  \nplease try again.',
          f: 'ghostbusters',
        }));
      });
      done();
    });
  });
  describe('/POST Route', function() {
    it('should post a cow with saying Eat-Mor-Chikin', function(done) {
      request.post('localhost:3000/cowsay')
      .send({text: 'Eat-Mor-Chikin'})
      .end((err, res)=> {
        expect(res.status).to.equal(200);
        expect(res.text).to.equal(cowsay.say({text: 'Eat-Mor-Chikin'}));
        done();
      });
    });
  });
});