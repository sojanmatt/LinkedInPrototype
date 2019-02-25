var kafka = require("../kafka/client");
var express = require('express');
var router = express.Router();


router.post('/', function(req, res){
    kafka.make_request('log_app_halffilled_topic', req, function(err, result){
        if(err){
            console.log('Unable to log job half filled.', err.message);
            res.writeHead(400, {
                'Content-type': 'text/plain'
            });
            res.end('Error in logging half filled jobs');
        }
        else{
            console.log('Logging Job half filled successful.', result);
            res.writeHead(200,{
                'Content-type' : 'application/json'
            });
            res.end(JSON.stringify(result));
        }
    });
});

module.exports = router;