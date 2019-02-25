var Model = require('../model/linkedin');
var mysql = require("mysql");
var pool = require('../pool');

var con = mysql.createConnection({
    connectionLimit: 100,
    host: "linkedinteam1.c4redet1j4es.us-west-1.rds.amazonaws.com",
    user: "linkedin",
    password: "linkedin",
    database: "linkedin"
  });
  var res = {};
function handle_request(message,callback){
    console.log('Inside delete profile data req body', message.body);
    var res = {};
    var sql = "delete FROM linkedin_users WHERE email = " +  mysql.escape(message);
            console.log("profileGet",sql);
            con.query(sql,function(err,result){
                console.log(result);
                  if(err){
                    res.code = "400";
                    callback(null, res);
                  }else{
                    console.log("success deletion");
                    res.code = "200";
                    callback(null, res);
                  }
                  } )

    Model.remove({
        "user.email" : message
    }, (err, result)=>{
        if(err){
            console.log('Error deleting account');
            callback(err, null);
        }
        else{
            console.log('Profile delete success');
            callback(null, result);
        }
    });
}

exports.handle_request = handle_request;