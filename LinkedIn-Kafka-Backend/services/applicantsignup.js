var bcrypt = require("bcrypt");
var mysql = require("mysql");
var pool = require('../pool');
var LinkedIn = require("../model/linkedin");
const saltRounds = 10;

function handle_request(msg, callback) {
  var res = {};
  console.log("In applicant signup handle request:" + JSON.stringify(msg));

  console.log("signup message", msg);
  pool.getConnection(function(err,con) {
        if (err) 
            throw err;
            console.log(msg.password);
        var sql1 = "SELECT *  FROM linkedin_users WHERE email = " + mysql.escape(msg.email);
        con.query(sql1, function(err,result) {
          if(err) {
            console.log("error while trying to find the duplicate");
            res.msg = "error while trying to find the duplicate";
            res.code = 400;
            callback(err,res);
          }
          else {
            if(result.length>0) {
              console.log("duplicate user");
              res.msg = "duplicate user";
              res.code = 400;
              callback(err,res);
            }
            else {
              bcrypt.hash(msg.password, saltRounds, function(err, hash) {
                if(err || hash==null || hash==undefined) {
                  res.code = "400";
                  console.log("mismatch1");
                  console.log(res.value);
                  callback(err, null);
                }
                 hashed_password = hash;
                console.log(hash);
                pool.getConnection(function(err,con) {
              var sql = "INSERT INTO linkedin_users(email, password, Fname, Lname, accountType) VALUES ( " + 
           mysql.escape(msg.email) + " , " + mysql.escape(hashed_password) +" , " + mysql.escape(msg.Fname) +" , "+ mysql.escape(msg.Lname) +" , " + mysql.escape("1") + " ) ";
           console.log("sql",sql);  
           con.query(sql,function(err,result){
                console.log("sql",sql);
                  if(err){
                    console.log("err",err)
                    res.code = 400;
                    callback(err, null);
                  }else{
                    var myobj = new LinkedIn({
                      user: {
                      email: msg.email,
                      password: hashed_password,
                      Fname: msg.Fname,
                      Lname: msg.Lname,
                      accountType: "1"
                    }
                  });
      
                  var promise = myobj.save();
      
                  promise
                    .then(function() {
                      console.log("applicant inserted");
                      res.value = msg;
                      res.code = 200;
                      callback(null, res);
                    })
      
                    .catch(function(err) {
                      console.log("error:", err.message);
                      if (err.message.includes("username_1 dup key:"))
                        res.value = "This username already exists!";
                      else res.value = "Error in registering data please try again!";
      
                      res.code = "400";
                      callback(null, res);
                    });
                  }
              })
      
                })
              });      
            }
          }
        });
     
        })

  // bcrypt.hash(msg.password, saltRounds, function(err, hash) {
  //   hashed_password = hash;

  //   var myobj = new LinkedIn({
  //     user: {
  //       email: msg.email,
  //       password: hashed_password,
  //       Fname: msg.Fname,
  //       Lname: msg.Lname,
  //       accountType: "1"
  //     }
  //   });

  //   var promise = myobj.save();

  //   promise
  //     .then(function() {
  //       console.log("applicant inserted");
  //       res.value = msg;
  //       res.code = 200;
  //       callback(null, res);
  //     })

  //     .catch(function(err) {
  //       console.log("error:", err.message);
  //       if (err.message.includes("username_1 dup key:"))
  //         res.value = "This username already exists!";
  //       else res.value = "Error in registering data please try again!";

  //       res.code = "400";
  //       callback(null, res);
  //     });
  // });
}

exports.handle_request = handle_request;
