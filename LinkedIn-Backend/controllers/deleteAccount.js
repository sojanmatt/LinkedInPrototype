var kafka = require("../kafka/client");
//var express = require('express');
//var router = express.Router();

var kafka = require("../kafka/client");
exports.deleteAccount = function(req, res) {
    kafka.make_request('delete_profile_topic', req.params.id, function(err, result){
        if(err){
            console.log('Unable to delete.', err);
            res.writeHead(400, {
                'Content-type': 'text/plain'
            });
            res.end('Error in deleting data');
        }
        else{
            console.log('Profile data successful.', result);
            res.writeHead(200,{
                'Content-type' : 'application/json'
            });
            res.end("Deleted Successfully");
        }
    });
};

// module.exports = router;