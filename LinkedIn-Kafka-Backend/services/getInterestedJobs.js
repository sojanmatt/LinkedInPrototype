var Model = require('../model/jobPosts');

function handle_request(message, callback){
    var query = Model.find().sort({"_id":-1}).limit(8)
    query.exec((err, result)=>{
        if(err){
            console.log('Error in getting interested jobs');
            callback(err, null);
        }
        else{
            console.log('Retrieval success', result);
            callback(null, result);
        }
    });
}

exports.handle_request = handle_request;