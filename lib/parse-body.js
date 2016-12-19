'use strict';

module.exports = function(req, callback){//the request is the thing that has the data
//handle all POST request
  req.body = '';

  req.on('data', function(data){ //data is the json object BUT IT IS ENCODED AS A buffer and needs to be parsed and concatenated before served to client/browser
    req.body += data.toString();
  });
  //now, we need to create a valid json object out of the body
  req.on('end', function(){
    try {
      req.body = JSON.parse(req.body);
      callback(null, req.body);//callback has no error, and has a fully optimized request body to pass as a POST once its required in
    } catch (err) {
      callback(err); //try this stuff, if there's an error, callback with an error
    }
  });
};
