var jobsHistory = require("../model/jobPosts");

function handle_request(msg, callback) {
  jobsHistory.find(
    { jobId: msg.jobId /*"5bf31c0adef01f0dd81e2447" */ },
    { _id: 0, applicantData: 1 },
    (err, result) => {
      if (err) {
        console.log("Error in Retrieving clicked job  data", err);
        callback(err, null);
      } else {
        console.log("Clicked d data", result);
        callback(null, result);
      }
    }
  );
  //   console.log("Connected!");
  //   console.log("message is", "abc@gmail.com");
  //   var res = {};

  //   var pipeline = [
  //     { $match: { user: "abc@gmail.com" } },

  //     // {
  //     //   $group: {
  //     //     _id: "$jobTitle",
  //     //     applicantData: { $push: "$applicantData" },
  //     //     size: { $sum: 1 }
  //     //   }
  //     // }
  //     { applicantData: 1 }
  //   ];

  //   var promise = jobsHistory.aggregate(pipeline).exec();

  //   promise
  //     .then(function(data) {
  //       console.log("city wise  job data-");
  //       console.log(data);
  //       res.value = data;
  //       if (data) {
  //         res.code = 200;
  //         callback(null, res);
  //       }
  //     })
  //     .catch(function(err) {
  //       // just need one of these
  //       console.log("error:", err.message);
  //       res.code = "400";
  //       callback(err, res);
  //     });
}
exports.handle_request = handle_request;
