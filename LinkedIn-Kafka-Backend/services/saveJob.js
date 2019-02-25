var Model = require('../model/linkedin');
var SavedJobsModel = require('../model/savedJobs');

function handle_request(message, callback){
    console.log('message:', message.body);
    //console.log('session', message.session.user)

    Model.findOneAndUpdate({
        "user.email" : message.body.email
    },
    {
        $push:{
            savedjobs: message.body.jobDetails
        }
    }, (err, result)=>{
        if(err){
            console.log('Error in Save job');
            callback(err, null);
        }
        else{
            var newSavedJob = new SavedJobsModel({
                jobId : message.body.jobDetails.jobId,
                jobTitle : message.body.jobDetails.jobTitle,
                recruiterEmail : message.body.jobDetails.user
            });
            console.log('Saving Job', newSavedJob);
            newSavedJob.save().then((doc)=>{
                console.log('Save Job success!');
                callback(null, doc);
            },(err)=>{
                console.log('Error in Save job');
                callback(err, null);
            }); 
            
        }
    });    
}

exports.handle_request = handle_request;