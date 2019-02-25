var Model = require('../model/linkedin');

function handle_request(message, callback){
    Model.find({
        "user.email": message
    }, (err, result)=>{
        if(err){
            console.log('Error in getting applied jobs');
            callback(err, null);
        }
        else{
            console.log('Retrieval success', result[0].appliedJobs);
            callback(null, result[0].appliedJobs);
        }
    });
}

exports.handle_request = handle_request;