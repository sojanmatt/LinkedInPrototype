var Model = require("../model/savedJobs");

function handle_request(message, callback) {
  console.log("message.username", message.username);
  Model.find(
    { recruiterEmail: message.username },
    { _id: 0 },
    (err, result) => {
      if (err) {
        console.log("Error in Retrieving saved job  data", err);
        callback(err, null);
      } else {
        console.log("saved job data", result);
        callback(null, result);
      }
    }
  );
}
exports.handle_request = handle_request;
