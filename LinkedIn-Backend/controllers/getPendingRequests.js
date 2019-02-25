var kafka = require("../kafka/client");
var express = require('express');
var router = express.Router();

router.get('/:id', function(req, res){
    console.log('Inside pending requests, req: ', req);
    kafka.make_request("get_pending_requests", req.params.id, function(err, result){
        if(err){
            console.log('Unable to get pending requests.', err.message);
            res.writeHead(400, {
                'Content-type': 'text/plain'
            });
            res.end('Error in getting pending requests');
        }
        else{
            console.log('Get Pending Requests successful.', result.data);
            res.writeHead(200,{
                'Content-type' : 'application/json'
            });
            res.end(JSON.stringify(result));
        }
    });
});

module.exports = router;