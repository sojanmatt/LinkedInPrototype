var kafka = require("../kafka/client");
var express = require('express');
var router = express.Router();


router.post('/', function(req, res){
    kafka.make_request('accept_request_topic', req, function(err, result){
        if(err){
            console.log('Unable to accept requests.', err);
            res.writeHead(400, {
                'Content-type': 'text/plain'
            });
            res.end('Error in accept requests');
        }
        else{
            console.log('Accept request sucesssful.', result);
            res.writeHead(200,{
                'Content-type' : 'application/json'
            });
            res.end(JSON.stringify(result));
        }
    });
});

module.exports = router;