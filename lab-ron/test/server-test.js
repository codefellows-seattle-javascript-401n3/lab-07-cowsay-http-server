'use strict';
const request = require('superagent');
const expect = require('chai').expect;

describe('cowsay response', function() {
  describe('POST request, what you should see when you c.u.r.l. http://localhost:3000/cowsay?text=HolyCow!', function(done) {
    it('should read HolyCow!', function() {
      request.post('http://localhost:3000/cowsay?text=HolyCow!')
      .end((err, res) => {
        expect(res.text).to.equal('HolyCow!');
        done();
      });
    });
  });
});

describe('GET request for Ron\'s Cowsay server', function() {
  it('should return a 200 status code when a valid GET request is made', function(done) {
    request.get('http://localhost:3000/cowsay?text=HolyCow')
     .end((err, res) => {
       expect(res.status).to.equal(200);
       done();
     });
  });
  it('should return a 400 status code when an invalid GET request is made', function(done) {
    request.get('http://localhost:3000/cowsay?invalidrequest=brokenYouGet400')
     .end((err, res) => {
       expect(res.status).to.equal(400);
       done();
     });
  });
});
