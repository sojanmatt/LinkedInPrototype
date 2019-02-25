var Model = require('../model/linkedin');


function handle_request(message, callback){
    console.log('Inside send Connection reqyest Kafka', message.body);

    Model.findOneAndUpdate({
        "user.email": message.body.email
    }, {
        $push:{
            connectionRequests : message.body.connectProfileData
        }
    }, (err, result)=>{
        if(err){
            onsole.log('Error in sending connection req', err);
            callback(err, null);
        }
        else{
            console.log('Send Conenction affed tp profile', result);
            callback(null, result);
        }
    });
}

exports.handle_request = handle_request;