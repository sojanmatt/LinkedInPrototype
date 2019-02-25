var Model = require('../model/linkedin');

function handle_request(message,callback){
    console.log('Inside get profile data req body', message.body);

    Model.findOne({
        "user.email" : message.body.email
    }, (err, result)=>{
        if(err){
            console.log('Error in getting profile data');
            callback(err, null);
        }
        else{
            console.log('Profile data get success');
            callback(null, result);
        }
    });
}

exports.handle_request = handle_request;