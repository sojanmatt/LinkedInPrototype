var HalfFilledJobsSchema =require('../model/halfFIlledJobs');

function handle_request(message, callback){
    console.log('Inside log half filled, message', message.body);
    var logJob = new HalfFilledJobsSchema({
        jobId : message.body.jobId,
        jobTitle : message.body.jobTitle
    });

    logJob.save().then((doc)=>{
        console.log('Logging Half filled Job', doc);
        callback(null, doc);
    }, (err)=>{
        console.log('Error in logging half filled job');
        callback(err, null);
    });
}

exports.handle_request = handle_request;