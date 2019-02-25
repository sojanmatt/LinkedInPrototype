var linkedinUser = require("../model/linkedin");
var regex = require("regex");

function handle_request(msg, callback) {
  console.log("Connected to kafka search people!");
  console.log(msg.query);
  var str = msg.query;
  var fname ="";
  var lname= "";
  if(str != null){
    var words = str.split(" ");
if(words.length==2){
 fname= words[0];
 lname = words[1];
}
else
{
  fname = msg.query;
  lname = msg.query;
}
  }
  var res = {};
      linkedinUser.find(
        { 
          "$or": [{"user.Fname": {$regex:new RegExp(fname, "i")}
        },
        {
          "user.Lname": { $regex : new RegExp(lname, "i")}},{"user.Fname": fname},{"user.Lname": lname}]
        },{
          user : 1, connections : 1
        },  function (err,result) {
        if (err) {
            res.code = "400";
            console.log("No records exist");
            res.value =
              "No records exist";
            console.log(res.value);
            callback(err,res);
          } else {
              console.log("response from db", result);
              if (result == null) {
                res.code = "400";
                console.log("mismatch1");
                res.value = "No records exist";
                console.log(res.value);
                callback(null, res);
              } 
              else {
                console.log("result:" , result)
                res.code = "200";
                res.value = result;
                callback(null,res);
              }
            }
          }
      );
    }
exports.handle_request = handle_request;
