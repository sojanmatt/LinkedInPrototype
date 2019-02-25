var kafka = require("../kafka/client");
exports.jobPostingHistory = function(req, res) {
  console.log("Inside postJob as a recruiter Handler");
  console.log(req.body);
  var user = {
    username: req.body.username //req.session.user
  };
  kafka.make_request("job_posting_history_topic", user, function(err, results) {
    console.log(user);
    console.log("resultresult", req.body.username);
    if (err) {
      console.log("unable to reach kafka job post history");
      res.value = "unable to reach kafka job post history";
      console.log(res.value);
      res.sendStatus(400).end();
    } else if (results.code == 200) {
      // console.log("resres", results);
      res.writeHead(200, {
        "Content-type": "application/json"
      });
      res.end(JSON.stringify(results));
    } else {
      res.value = "job post history fetch failed";
      res.sendStatus(400).end();
    }
  });
};
