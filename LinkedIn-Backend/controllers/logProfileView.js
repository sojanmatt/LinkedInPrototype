var kafka = require("../kafka/client");
var express = require('express');
var router = express.Router();

router.post('/', function(req, res){
    kafka.make_request('log_profile_view_topic', req, function(err, result){
        if(err){
            console.log('Unable to log profile view.', err.message);
            res.writeHead(400, {
                'Content-type': 'text/plain'
            });
            res.end('Error in logging profile view');
        }
        else{
            console.log('Logging Profile view successful.', result);
            res.writeHead(200,{
                'Content-type' : 'application/json'
            });
            res.end(JSON.stringify(result));
        }
    });
});

module.exports = router;