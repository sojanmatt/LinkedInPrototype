var kafka = require("../kafka/client");

var express = require('express');
var router = express.Router();

router.post('/', function(req, res){
    console.log('Inside GET messages');
    console.log('Request Body: ', req.body);

    kafka.make_request("get_messages_topic", req, function(err, result){
        if(err){
            console.log('Unable to get messages.', err.message);
            res.writeHead(400, {
                'Content-type': 'text/plain'
            });
            res.end('Error in get messages');
        }
        else{
            console.log('Messages retrieval successful.', result);
            res.writeHead(200,{
                'Content-type' : 'application/json'
            });
            res.end(JSON.stringify(result));
        }
    });
});

module.exports = router;