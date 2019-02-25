var kafka = require("../kafka/client");
var express = require('express');
var router = express.Router();


router.post('/', function(req, res){
    kafka.make_request('ignore_request_topic', req, function(err, result){
        if(err){
            console.log('Unable to post ignore requests.', err);
            res.writeHead(400, {
                'Content-type': 'text/plain'
            });
            res.end('Error in posting ignore requests');
        }
        else{
            console.log('Ignore request sucesssful.', result.data);
            res.writeHead(200,{
                'Content-type' : 'application/json'
            });
            res.end(JSON.stringify(result));
        }
    });
});

module.exports = router;