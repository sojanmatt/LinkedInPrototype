var kafka = require("../kafka/client");
var express = require('express');
var router = express.Router();

router.post('/', function(req, res){
    kafka.make_request('get_profile_data_updated_topic', req, function(err, result){
        if(err){
            console.log('Unable to get profile data.', err);
            res.writeHead(400, {
                'Content-type': 'text/plain'
            });
            res.end('Error in getting profile data');
        }
        else{
            console.log('Profile data successful.', result);
            res.writeHead(200,{
                'Content-type' : 'application/json'
            });
            res.end(JSON.stringify(result));
        }
    });
});
    
module.exports = router;