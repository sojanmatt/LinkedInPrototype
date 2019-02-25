var profileViewsSchema = require('../model/profileViews');

function handle_request(message, callback){
    console.log('Inside log Profile views, req body', message.body);
    var viewLog = new profileViewsSchema({
       profileEmail : message.body.profileEmail,
       viewTime : message.body.viewTime

    });

    viewLog.save().then((doc)=>{
        console.log('Logging Profile view', doc);
        callback(null, doc);

    }, (err)=>{
        console.log('Error in logging profile views');
        callback(err, null);
    });
}


exports.handle_request = handle_request;