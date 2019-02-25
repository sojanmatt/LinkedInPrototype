var kafka = require("../kafka/client");
var express = require('express');
var router = express.Router();

router.get('/:id', function(req, res){
    kafka.make_request("get_applied_jobs_topic", req.params.id, function(err, result){
        if(err){
            console.log('Unable to get applied jobs.', err);
            res.writeHead(400, {
                'Content-type': 'text/plain'
            });
            res.end('Error in getting applied jobs');
        }
        else{
            console.log('Get Applied Job successful.', result);
            res.writeHead(200,{
                'Content-type' : 'application/json'
            });
            res.end(JSON.stringify(result));
        }
    });
});

module.exports = router;