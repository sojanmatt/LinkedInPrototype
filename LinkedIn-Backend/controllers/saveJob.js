var kafka = require("../kafka/client");
var express = require('express');
var router = express.Router();

router.post('/', function(req, res){
    console.log('POST inside saved jobs', req.body);

    kafka.make_request("save_job_topic", req, function(err, result){
        if(err){
            console.log('Unable to save jobs.', err.message);
            res.writeHead(400, {
                'Content-type': 'text/plain'
            });
            res.end('Error in save jobs');
        }
        else{
            console.log('Save Job successful.', result);
            res.writeHead(200,{
                'Content-type' : 'application/json'
            });
            res.end(JSON.stringify(result));
        }
    });
});

module.exports = router;