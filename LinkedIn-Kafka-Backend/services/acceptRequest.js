var Model = require('../model/linkedin');

function handle_request(message,callback){
    Model.findOne({
        "user.email" : message.body.email
    }, (err, user)=>{
        if(err){
            console.log('Error in getting profile data');
            callback(err, null);
        }
        else{
            console.log('profile data', user);
            var connectionRequests = user.connectionRequests;
            var acceptedConnection = connectionRequests.splice(message.body.index, 1);
            var connectionArray = user.connections;
            console.log('Accepted Connection', acceptedConnection[0]);
            connectionArray.push(acceptedConnection[0]);
            user.connections = connectionArray;
            user.connectionRequests = connectionRequests;
            user.save().then((doc)=>{
               
                //Add profile to requester user's connection
               Model.findOne({
                   "user.email" : acceptedConnection[0].email
               }, (err, result)=>{
                    if(err){
                        console.log('Error in getting profile data');
                        callback(err, null);
                    }
                    else{
                        var resultConnectionArr = result.connections;
                        resultConnectionArr.push(user.user);
                        result.connections = resultConnectionArr;
                        result.save().then((doc1)=>{
                            console.log('Update to connection requests succesful', doc);
                            console.log('Update to connection requests succesful', doc1);
                            callback(null, doc);
                        }, (err)=>{
                            console.log('error in saving connection requests', err);
                            callback(err, null);
                        });
                    }
               });



            }, (err)=>{
                console.log('error in saving connection requests', err);
                callback(err, null);
            });       
        }
    });


}

exports.handle_request = handle_request;