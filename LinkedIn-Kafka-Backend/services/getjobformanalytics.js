var ViewedForms = require("../model/viewedJobs");
var HalfFilledForms = require("../model/halfFIlledJobs");
var CompleteFilledForms = require("../model/applicationSubmitted");

var FinalResult = {
  HalfFilled: 0,
  Viewed: 0,
  Completed: 0
};
function handle_request(message, callback) {
  ViewedForms.find({ jobId: message.jobId }, { _id: 0 }, (err, result) => {
    if (err) {
      console.log("Error in Retrieving job form analytics job  data", err);
      callback(err, null);
    } else {
      console.log("viewed job data", result.length);
      FinalResult.Viewed = result.length;
      HalfFilledForms.find(
        { jobId: message.jobId },
        { _id: 0 },
        (err, resulthalffilled) => {
          if (err) {
            console.log(
              "Error in Retrieving job form analytics job  data",
              err
            );
            callback(err, null);
          } else {
            console.log("halffilled job data", resulthalffilled.length);
            FinalResult.HalfFilled = resulthalffilled.length;
            CompleteFilledForms.find(
              { jobId: message.jobId },
              { _id: 0 },
              (err, rescompletefilled) => {
                if (err) {
                  console.log(
                    "Error in Retrieving job form analytics job  data",
                    err
                  );
                  callback(err, null);
                } else {
                  console.log(
                    "rescompletefilled job data",
                    rescompletefilled.length
                  );
                  FinalResult.Completed = rescompletefilled.length;
                  callback(null, FinalResult);
                }
              }
            );
            //  callback(null, FinalResult);
          }
        }
      );
    }
  });
}
exports.handle_request = handle_request;
