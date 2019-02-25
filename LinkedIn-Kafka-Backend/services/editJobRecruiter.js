var postJob = require("../model/jobPosts");
var mongooseTypes = require('mongoose').Types;
var linkedIn = require("../model/linkedin");

function handle_request(msg, callback) {
  console.log("Connected to kafka edit post job!");
  console.log(msg);
//   { jobId: '5bf31b53def01f0dd81e2445',
//   companyName: 'a',
//   jobTitle: 'a',
//   industry: '',
//   employmentType: 'Full-time',
//   location: '',
//   seniorityLevel: 'Full-time',
//   jobDescription: '',
//   postedDate: '2018-12-01T01:01:15.272Z',
//   images: '',
//   user: 'abc@gmail.com' }
  var res = {};

  var promise = postJob.update(
    {"jobId": msg.jobId},
    {$set: { 
        jobId: msg.jobId,
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
        companyLogo: msg.images}}
  );
  promise
      .then(function() {
      var promise1 = linkedIn.update(
        {"JobPostings.jobId": msg.jobId},
        {$set: {JobPostings :
          {
            jobId: msg.jobId,
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
         console.log("job updated!!");
        res.value = msg;
        res.code = 200;
        callback(null, res);
      })
      .catch(function(err) {
        console.log("error:", err.message);
        res.value = "unable to edit job";

        res.code = "400";
        callback(null, res);
      });
    })
      .catch(function(err) {
        console.log("error:", err.message);
        res.value = "unable to edit job";

        res.code = "400";
        callback(null, res);
      });
}
exports.handle_request = handle_request;
