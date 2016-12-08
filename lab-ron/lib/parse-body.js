'use strict';

module.exports = function(req, callback) {
  req.body = '';

  req.on('data', function(data) {
    req.body += data.toString();
  });

  req.on('end', function(err, body) {
    try {
      // data = req.body;
      req.body = JSON.parse(req.body);
      callback(null, req.body);
    } catch (err) {
      callback(err);
    }
  });
};

// req.on('end', function(err, data, callback) {
//   if(err) callback(err);
//
//   data = JSON.parse(req.body);
//   callback(null, req.body);
// });

//The block of code below was provided as starter code, I prefer the above. What is the difference?
