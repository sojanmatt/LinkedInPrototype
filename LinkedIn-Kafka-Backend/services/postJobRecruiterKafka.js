var postJob = require("../model/jobPosts");
var mongooseTypes = require('mongoose').Types;
var linkedIn = require("../model/linkedin");

function handle_request(msg, callback) {
  console.log("Connected to kafka post job!");
  console.log(msg);
  var res = {};
  const newObjectId =  mongooseTypes.ObjectId();
  var myobj = new postJob({
      jobId: newObjectId,
      user: msg.user,  
      companyName: msg.companyName,
      jobTitle: msg.jobTitle,
      industry: msg.industry,
      employmentType: msg.employmentType,
      easyApply: msg.easyApply,
      location: msg.location,
      seniorityLevel: msg.seniorityLevel,
      jobDescription: msg.jobDescription,
      postedDate: msg.postedDate,
      companyLogo: msg.images
  });
  var promise = myobj.save();
  promise
      .then(function() {
      var promise1 = linkedIn.update(
        {"user.email": msg.user},
        {$push: {JobPostings :
          {
            jobId: newObjectId,
            user: msg.user,  
            companyName: msg.companyName,
            jobTitle: msg.jobTitle,
            industry: msg.industry,
            employmentType: msg.employmentType,
            easyApply: msg.easyApply,
            location: msg.location,
            seniorityLevel: msg.seniorityLevel,
            jobDescription: msg.jobDescription,
            postedDate: msg.postedDate,
            companyLogo: msg.images} } }
      );
      promise1
      .then(function() {
         console.log("new job inserted");
        res.value = msg;
        res.code = 200;
        callback(null, res);
      })
      .catch(function(err) {
        console.log("error:", err.message);
        res.value = "unable to insert job";

        res.code = "400";
        callback(null, res);
      });
    })
      .catch(function(err) {
        console.log("error:", err.message);
        res.value = "unable to insert job";

        res.code = "400";
        callback(null, res);
      });
}
exports.handle_request = handle_request;
