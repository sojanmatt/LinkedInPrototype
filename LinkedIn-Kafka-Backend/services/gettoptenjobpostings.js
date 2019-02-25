var jobsHistory = require("../model/jobPosts");

function handle_request(msg, callback) {
  console.log("Connected!");
  console.log("message is", "abc@gmail.com");
  var res = {};

  var pipeline = [
    { $match: { user: msg.username } },
    { $unwind: "$applicantData" },
    {
      $group: {
        _id: "$jobTitle",
        //   applicantData: { $push: "$applicantData" },
        size: { $sum: 1 }
      }
    },
    { $sort: { size: -1 } },
    { $limit: 10 }
  ];

  var promise = jobsHistory.aggregate(pipeline).exec();
  promise
    .then(function(data) {
      console.log("top 10 job data-");
      console.log(data);
      res.value = data;
      if (data) {
        res.code = 200;
        callback(null, res);
      }
    })
    .catch(function(err) {
      // just need one of these
      console.log("error:", err.message);
      res.code = "400";
      callback(err, res);
    });
}
exports.handle_request = handle_request;
