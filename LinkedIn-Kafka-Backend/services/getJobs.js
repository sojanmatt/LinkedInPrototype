var Model = require('../model/jobPosts');


function handle_request(message, callback){
    Model.find({
        
    }, (err, result)=>{
        if(err){
            console.log('Error in Retrieving job data', err);
            callback(err, null);
        }
        else{
            console.log('Job data', result);
            callback(null, result);
        }
    });
}
exports.handle_request = handle_request;