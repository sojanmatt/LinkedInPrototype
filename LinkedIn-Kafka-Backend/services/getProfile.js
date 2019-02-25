var model = require('../model/linkedin');

function handle_request(message, callback){

    //var res = {};
    // var promise = profileModel.find({
    //     "email" : "khannay0@narod.ru"
    // })
    // promise
    // .then(function(result) {
    //   console.log("user profile from DB");
    //   res.value = result;
    //   res.code = 200;
    //   callback(null, res);
    // })

    // .catch(function(err) {
    //     console.log("error:", err);
    //     res.value = "unable to get profile";
    //     res.code = "400";
    //     callback(null, res);
    // });

    

    model.find({
        "user.email" : message
    }, (err, result)=>{
        if(err){
            console.log('Error in Retrieving profile data', err);
            callback(err, null);
        }
        else{
            console.log('Profile data', result[0].user);
            callback(null, result[0].user);
        }
    });

}

exports.handle_request = handle_request;