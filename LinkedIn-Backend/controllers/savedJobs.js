var kafka = require("../kafka/client");
var express = require('express');
var router = express.Router();

router.get('/:id', function(req, res){
    console.log('Params Id', req.params.id);
    kafka.make_request("saved_jobs_topic", req.params.id, function(err, result){
        if(err){
            console.log('Unable to sget saved jobs.', err.message);
            res.writeHead(400, {
                'Content-type': 'text/plain'
            });
            res.end('Error in getting saved jobs');
        }
        else{
            console.log('Get Saved Job successful.', result);
            res.writeHead(200,{
                'Content-type' : 'application/json'
            });
            res.end(JSON.stringify(result));
        }
    });
});

module.exports = router;