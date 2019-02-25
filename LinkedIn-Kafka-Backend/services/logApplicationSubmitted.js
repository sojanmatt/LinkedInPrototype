var ApplicationSubmittedSchema =require('../model/applicationSubmitted');

function handle_request(message, callback){
    console.log('Inside log half filled, message', message.body);
    var logJob = new ApplicationSubmittedSchema({
        jobId : message.body.jobId,
        jobTitle : message.body.jobTitle
    });

    logJob.save().then((doc)=>{
        console.log('Logging App submitted  Job', doc);
        callback(null, doc);
    }, (err)=>{
        console.log('Error in Logging App submitted  Job');
        callback(err, null);
    });
}

exports.handle_request = handle_request;