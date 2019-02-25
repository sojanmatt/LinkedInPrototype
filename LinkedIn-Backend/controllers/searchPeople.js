var kafka = require("../kafka/client");
exports.searchPeople = function(req, res) {
    console.log("Inside searchPeople");
    console.log(req.body);
    kafka.make_request("searchPeople_topic", req.body, function(err, results) {
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
          console.log("resres", results.value);
          res.send(results.value);
        } else {
          res.value =
            "posting job failed";
             res.sendStatus(400).end();
        }
  
    });
  };