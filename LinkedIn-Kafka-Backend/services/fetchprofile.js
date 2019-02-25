var bcrypt = require("bcrypt");
var linkedInUser = require("../model/linkedin");


function handle_request(msg, callback) {
    var res = {};

    linkedInUser.findOne({"user.email":msg.email},
        function(err,docs) {
            if(err){
                console.log("Inside if : error",err);
                res.code="400";
                res.value="No user found";
                //res.sendStatus(400).end("No user found");
                callback(null,res.value);
            }
            else{
                console.log("Inside else : ");
                res.code="200";
                
                console.log("User is found",docs);
                    //res.end(JSON.stringify(docs));
                callback(null,docs);
            }
        }
            )



}

exports.handle_request = handle_request;