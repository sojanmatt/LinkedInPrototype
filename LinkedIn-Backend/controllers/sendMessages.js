var kafka = require("../kafka/client");
var express = require('express');
var router = express.Router();


router.post('/', function(req, res){
    console.log('Request body', req.body);
    kafka.make_request("send_messages_topic", req, function(err, result){
        if(err){
            console.log('Unable to send message', err.message);
            res.writeHead(400, {
                'Content-type': 'text/plain'
            });
            res.end('Error in sending message');
        }   
        else{
            console.log('Sending mesasge successful.', result);
            res.writeHead(200,{
                'Content-type' : 'application/json'
            });
            res.end(JSON.stringify(result));
        } 
    });
});

module.exports = router;