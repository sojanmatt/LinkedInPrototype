var Model = require('../model/linkedin');

function handle_request(message, callback){
    console.log('Message: ', message);
    Model.find({
        'user.email': message
    }, (err, result)=>{
        if(err){
            console.log('Error in getting saved jobs');
            callback(err, null);
        }
        else{
            console.log('Retrieval success', result[0].savedjobs);
            callback(null, result[0].savedjobs);
        }
    });
}

exports.handle_request = handle_request;