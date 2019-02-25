var Model = require('../model/linkedin');

function handle_request(message, callback){
    console.log('Inside Kafks egt connections, email : ', message);

    Model.findOne({
        "user.email" : message
    }, (err, result)=>{
        if(err){
            console.log('Error in gettig connection data');
            callback(err, null);
        }
        else{
            console.log('COnnection get succesuful', result.connections);
            callback(null, result.connections);
        }

    })
}

exports.handle_request = handle_request;