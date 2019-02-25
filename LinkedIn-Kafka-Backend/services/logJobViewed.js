var viewedJobsSchema = require('../model/viewedJobs');

function handle_request(message, callback){
    console.log('Inside log Job viewed, req body', message.body);
    var jobLog = new viewedJobsSchema({
        jobId : message.body.jobId,
        jobTitle: message.body.jobTitle
    });

    jobLog.save().then((doc)=>{
        console.log('Loggin Job view', doc);
        callback(null, doc);

    }, (err)=>{
        console.log('Error in log job viewed job');
        callback(err, null);
    });
}

exports.handle_request = handle_request;