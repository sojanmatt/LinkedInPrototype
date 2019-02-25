var linkedInUser = require("../model/linkedin");
const bcrypt = require("bcrypt");
var mysql = require("mysql");
var pool = require('../pool');

var con = mysql.createConnection({
  connectionLimit: 100,
  host: "linkedinteam1.c4redet1j4es.us-west-1.rds.amazonaws.com",
  user: "linkedin",
  password: "linkedin",
  database: "linkedin"
});

function handle_request(msg, callback) {
  console.log("Connected!");
  var username = msg.username;
  var password = msg.password;
  console.log(msg);
  var res = {};
  var sql = "SELECT *  FROM linkedin_users WHERE email = " +  mysql.escape(msg.username);
            console.log("profileGet",sql);
    con.query(sql,function(err,result){
      console.log(result);
        if(err || result == null || result.length<1){
          res.code = "400";
          console.log("mismatch1");
          res.value = "The email and password you entered did not match our records. Please double-check and try again.";
          console.log(res.value);
          callback(null, res);
        }else if (
          bcrypt.compareSync(msg.password, result[0].password) == true
        ) {
          console.log("success login");
          res.code = "200";
          res.value = result;
          console.log("login result", result);
          callback(null, res);
        } else {
          console.log("bcrypt mismatch");
          res.code = "400";
          callback(null, res);
      }
        
    })
   
  // linkedInUser.findOne(
  //   {
  //     "user.email": msg.username
  //   },
  //   function(err, result) {
  //     if (err) {
  //       res.code = "400";
  //       console.log("mismatch1");
  //       res.value =
  //         "The email and password you entered did not match our records. Please double-check and try again.";
  //       console.log(res.value);
  //     } else {
  //         console.log("response from db", result);
  //         if (result == null) {
  //           res.code = "400";
  //           console.log("mismatch1");
  //           res.value = "The email and password you entered did not match our records. Please double-check and try again.";
  //           console.log(res.value);
  //           callback(null, res);
  //         } else if (
  //           bcrypt.compareSync(msg.password, result.user.password) == true
  //         ) {
  //           console.log("success login");
  //           res.code = "200";
  //           res.value = result;
  //           console.log("login result", result);
  //           callback(null, res);
  //         } else {
  //           console.log("bcrypt mismatch");
  //           res.code = "400";
  //           callback(null, res);
  //       }
  //     }
  //   }
  // );
}
exports.handle_request = handle_request;
