var kafka = require("../kafka/client");
const jwt = require("jsonwebtoken");
exports.postJobRecruiter = function(req, res) {
  console.log("Inside postJob as a recruiter Handler");
  console.log(req.body);
  kafka.make_request("postJob_recruiter_topic", req.body, function(err, results) {
    if (err) {
        res.json({
          status: "error",
          msg: "System Error, Try Again."
        });
        console.log("unable to reach kafka post job");
        res.value = "unable to reach kafka post job";
        console.log(res.value);
        res.sendStatus(400).end();
      } else if (results.code == 200) {
        console.log("resres", results);
        res.sendStatus(200).end();
      } else {
        res.value =
          "posting job failed";
           res.sendStatus(400).end();
      }

  });
};
