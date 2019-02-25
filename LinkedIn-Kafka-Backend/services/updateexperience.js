var bcrypt = require("bcrypt");
var linkedInUser = require("../model/linkedin");


function handle_request(msg, callback) {
    var res = {};

    console.log("msg received",msg.email);
    console.log("msg array",msg.experience);
    linkedInUser.findOneAndUpdate({"user.email":msg.email},{"$set": {'user.experience':msg.experience}},
        function(err, user) {
          if (err) {
            res.code = "400";
            res.value =
              "The user is not valid";
            console.log(res.value);
            
            callback(null,res);
            //res.sendStatus(400).end();
          } else {
            res.code = "200";
            console.log("Update successful exper");
            callback(null,res);
            //res.sendStatus(200).end();
          } 
        }
      );
    }

exports.handle_request = handle_request;