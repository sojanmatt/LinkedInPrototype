var Model = require('../model/messages');


function handle_request(message, callback){
    Model.find({
        $or : [
        {receiverEmailId : message.body.senderEmailId},
        {senderEmailId : message.body.senderEmailId}
        ]
    }, (err, result)=>{
        if(err){
            console.log('Error in Retrieving messages data', err);
            callback(err, null);
        }
        else{
            console.log('Message data', result);
            callback(null, result);
        }
    });
}
exports.handle_request = handle_request;