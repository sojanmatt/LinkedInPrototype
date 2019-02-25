var kafka = require("../kafka/client");
exports.jobformanalytics = function(req, res) {
  console.log("Inside job form analytics Handler");
  // console.log(req.session.user);
  var Job = {
    jobId: req.params.id //"5bf31c53def01f0dd81e2449"
  };
  kafka.make_request("get_job_form_analytics_topic", Job, function(
    err,
    results
  ) {
    // console.log(user);
    console.log("resultresult", results);
    if (err) {
      console.log("unable to reach kafka job post history");
      res.value = "unable to reach kafka job post history";
      console.log(res.value);
      res.sendStatus(400).end();
    } else {
      console.log("resres", results);
      res.writeHead(200, {
        "Content-type": "application/json"
      });
      res.end(JSON.stringify(results));
    }
    // else {
    //   res.value = "job post history fetch failed";
    //   res.sendStatus(400).end();
    // }
  });
};