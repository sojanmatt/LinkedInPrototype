var userModel = require('../model/linkedin');
var jobModel = require('../model/jobPosts');

function handle_request(message, callback){
    console.log('Apply Job kafka', message);
    //Push to user details collection
    userModel.findOneAndUpdate({
        "user.email" : message.body.email
    }, {
        $push: {
            appliedJobs : message.body.jobData
        }
    }, (err, doc)=>{
            if(err){
                console.log('error ocuured', err);
                callback(err, null);
            }
            else{
                console.log('Saving applied jobs success!');
                //callback(null, doc);
            }
    });

    //Push to Job Posting collection
    jobModel.findOneAndUpdate({
        "jobId" : message.body.jobId
    }, {
        $push: {
            applicantData : message.body.applicationData
        }
    }, (err, doc)=>{
        if(err){
            console.log('error ocuured', err);
            callback(err, null);
        }
        else{
            console.log('Saving applied jobs success!');
            callback(null, doc);
        }
    });

}

exports.handle_request = handle_request;