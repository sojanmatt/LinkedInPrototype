var kafka = require("../kafka/client");
var express = require('express');
var router = express.Router();


router.post('/', function(req, res){
    console.log('Request body', req.body);
    kafka.make_request("send_connection_request", req, function(err, result){
        if(err){
            console.log('Unable to send connection request.', err.message);
            res.writeHead(400, {
                'Content-type': 'text/plain'
            });
            res.end('Error in send connection request');
        }   
        else{
            console.log('Send Connection request successful.', result);
            res.writeHead(200,{
                'Content-type' : 'application/json'
            });
            res.end(JSON.stringify(result));
        } 
    });
});

module.exports = router;