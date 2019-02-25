var Model = require('../model/linkedin');

function handle_request(message,callback){
    Model.findOne({
        "user.email" : message.body.email
    }, (err, user)=>{
        if(err){
            console.log('Error in getting profile data');
            callback(err, null);
        }
        else{
            console.log('profile data', user);
            var connectionRequests = user.connectionRequests;
            connectionRequests.splice(message.body.index, 1);
            user.connectionRequests = connectionRequests;
            user.save().then((doc)=>{
                console.log('Update to connection requests succesful', doc);
                callback(null, doc);
            }, (err)=>{
                console.log('error in saving connection requests', err);
                callback(err, null);
            });       
        }
    });
}

exports.handle_request = handle_request;