var kafka = require("../kafka/client");
var express = require('express');
var redis = require("redis");
var router = express.Router();
var client = redis.createClient();

router.post('/', function (req, res) {

  var arr = ["khannay0@narod.ru","mbrabender1@hao123.com","pkaszper2@go.com","dvillar3@about.me","wguy4@cbsnews.com","aletts5@printfriendly.com","srubrow6@vinaora.com","mharken7@typepad.com","dflukes8@wikia.com","esighard9@nsw.gov.au"];
  var index = Math.floor(Math.random() * (10 - 1 + 1)) + 1;
  //const query = arr[index];
  console.log('Request bdy', req.body);
  console.log('Email', req.body.email);
  const query = req.body.email;
  return client.get(`getProfile:${query}`, (err, result) => {
    console.log("result redis", JSON.stringify(result));
    // If that key exist in Redis store
    if (result) {
      console.log("result redis", JSON.stringify(result));
      const resultJSON = result;
      return res.status(200).send(resultJSON);
    }
    else {
      kafka.make_request("get_profile_topic", query, function (err, result) {
        if (err) {
          console.log('Unable to get profile details.', err);
          res.writeHead(400, {
            'Content-type': 'text/plain'
          });
          res.end('Error in get profile details');
        }
        else {
          client.setex(
            `getProfile:${query}`,
            3600,
            JSON.stringify({ source: "Redis cache", value: result })
          );
          res.status(200).send({ value: result });
        }
      });
    }
  });
});


module.exports = router;