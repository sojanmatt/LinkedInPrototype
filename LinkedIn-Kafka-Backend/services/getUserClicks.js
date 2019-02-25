var Model = require("../model/clickedjobs");

function handle_request(message, callback) {
  console.log("message.username for clicked jobs");
  Model.find(
    { "jobData.jobData.user": message.username },
    { _id: 0 },
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
}
exports.handle_request = handle_request;
