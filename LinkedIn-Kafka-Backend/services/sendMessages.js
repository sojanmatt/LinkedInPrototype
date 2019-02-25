var Model = require('../model/messages');


function handle_request(message, callback){
    console.log('Inside send messages Kafka', message.body);

    Model.findOneAndUpdate({
        $or : 
        [
            {
                $and : [
                    {senderEmailId : message.body.senderEmailId},{receiverEmailId : message.body.receiverEmailId}
                ]
            },
            {
                $and : [
                    {senderEmailId : message.body.receiverEmailId},{receiverEmailId : message.body.senderEmailId}
                ]
            }
        ]
    },
    { 
        $set: 
        { 
            senderEmailId : message.body.senderEmailId,
            receiverEmailId : message.body.receiverEmailId,
        } ,
    
        $push: 
        { messageThread: message.body.messageThread } 
    },
        { new: true, upsert: true },
     (err, result)=>{
        if(err){
            console.log('Error in sending message', err);
            callback(err, null);
        }
        else{
            console.log('Sending messages Kafka', result);
            callback(null, result);
        }
    });
}

exports.handle_request = handle_request;