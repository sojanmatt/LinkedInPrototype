var kafka = require("../kafka/client");

var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
    console.log('Inside GET Jobs');
    console.log('Request Body: ', req.body);

    kafka.make_request("get_jobs_topic", req, function(err, result){
        if(err){
            console.log('Unable to get jobs.', err.message);
            res.writeHead(400, {
                'Content-type': 'text/plain'
            });
            res.end('Error in get jobs');
        }
        else{
            console.log('Jobs retrieval successful.', result);
            res.writeHead(200,{
                'Content-type' : 'application/json'
            });
            res.end(JSON.stringify(result));
        }
    });
});

module.exports = router;