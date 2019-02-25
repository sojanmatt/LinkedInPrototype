var kafka = require("../kafka/client");
var express = require('express');
var router = express.Router();

router.post('/', function(req, res){
    console.log('Inside apply job post');
    kafka.make_request("apply_job_topic", req, function(err, result){
        if(err){
            console.log('Unable to apply jobs.', err.message);
            res.writeHead(400, {
                'Content-type': 'text/plain'
            });
            res.end('Error in apply jobs');
        }
        else{
            console.log('Apply Job successful.', result);
            res.writeHead(200,{
                'Content-type' : 'application/json'
            });
            res.end(JSON.stringify(result));
        }
    });

});

module.exports = router;