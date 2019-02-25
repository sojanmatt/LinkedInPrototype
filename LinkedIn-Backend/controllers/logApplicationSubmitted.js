var kafka = require("../kafka/client");
var express = require('express');
var router = express.Router();

router.post('/', function(req, res){
    kafka.make_request('log_application_submitted_topic', req, function(err, result){
        if(err){
            console.log('Unable to log application submitted job.', err.message);
            res.writeHead(400, {
                'Content-type': 'text/plain'
            });
            res.end('Error in logging log application submitted job');
        }
        else{
            console.log('log application submitted job successful.', result);
            res.writeHead(200,{
                'Content-type' : 'application/json'
            });
            res.end(JSON.stringify(result));
        }
    });
});

module.exports = router;