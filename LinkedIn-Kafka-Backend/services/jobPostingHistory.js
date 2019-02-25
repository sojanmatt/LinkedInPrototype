var jobsHistory = require("../model/jobPosts");

function handle_request(msg, callback) {
  console.log("Connected!");
  console.log("message is", msg.username);
  var res = {};
  jobsHistory
    .find({ user: msg.username /*msg.username*/ }, function(err, profile) {
      if (err) {
        res.code = "400";
        console.log("Error while fething booking history");
        res.value = "Error while fething booking history";
        console.log(res.value);
      } else {
        console.log("message is", msg);
        console.log("Fetched the booking history details: ", profile);
        res.code = "200";
        res.value = profile;
      }
      callback(null, res);
    })
    .catch(function(err) {
      console.log("error:", err.message);
      res.value = "unable to insert job";

      res.code = "400";
      callback(null, res);
    });
}
exports.handle_request = handle_request;
