var kafka = require("../kafka/client");

exports.userclicks = function(req, res) {
  console.log(req.body);

  console.log("inside user click req");

  kafka.make_request("user_click_topic", { job: req.body }, function(
    err,
    result
  ) {
    console.log("in post-user_click_topic");
    console.log(req.body);
    if (err) {
      console.log("err", err);
      res.status(500).send({ message: "Server Error!" });
    } else {
      console.log("user clicked Successful!");
      res.status(200).send({ message: "User clicke recorded" });
    }
  });
};
exports.savedjobs = function(req, res) {
  console.log(req.body);

  console.log("inside user click req");
  //let selectQuery = "SELECT max(prop_id) as prop_id from homeaway.property;";
  kafka.make_request("saved_jobs_topic", { job: req.body }, function(
    err,
    result
  ) {
    console.log("in saved_jobs_topic");
    console.log(req.body);
    if (err) {
      console.log("err", err);
      res.status(500).send({ message: "Server Error!" });
    } else {
      console.log("user clicked Successful!");
      res.status(200).send({ message: "saved jobs in analytics" });
    }
  });
};
exports.completeforms = function(req, res) {
  console.log(req.body);
  console.log("inside completed forms tracking req");
  kafka.make_request("completed_forms_topic", { job: req.body }, function(
    err,
    result
  ) {
    console.log("in completed_forms_topic");
    console.log(req.body);
    if (err) {
      console.log("err", err);
      res.status(500).send({ message: "Server Error!" });
    } else {
      console.log("user clicked Successful!");
      res.status(200).send({ message: "completed form recorded" });
    }
  });
};

exports.getuserclicks = function(req, res) {
  //console.log(req.body);
  var user = {
    username: req.params.id //req.session.user
  };
  console.log("inside fetch click data req");
  kafka.make_request("get_userclicks_topic", user, function(err, result) {
    console.log("in get_userclicks_topic");
    //  console.log(req.body);
    if (err) {
      console.log("err", err);
      res.status(500).send({ message: "Server Error!" });
    } else {
      console.log("user clicked data!");
      console.log("user clicks results", result);
      res.status(200).send({ result: result });
    }
  });
};

exports.getsavedjobs = function(req, res) {
  // console.log("session user", req.session.user);
  var user = {
    username: req.params.id //.user //req.session.user
  };
  console.log("inside fetch saved job data req");
  kafka.make_request("get_savedjobs_topic", user, function(err, result) {
    console.log("in get_savedjobs_topic");
    //  console.log(req.body);
    if (err) {
      console.log("err", err);
      res.status(500).send({ message: "Server Error!" });
    } else {
      console.log("saved job data!");
      console.log("saved jobs results", result);
      res.status(200).send({ result: result });
    }
  });
};

exports.gettoptenjobposts = function(req, res) {
  //console.log(req.body);
  var user = {
    username: req.params.id //"abc@gmail.com"
  };
  console.log("inside fetch saved job data req");
  kafka.make_request("get_top10_job_topic", user, function(err, result) {
    console.log("in get_top10_job_topic");
    //  console.log(req.body);
    if (err) {
      console.log("err", err);
      res.status(500).send({ message: "Server Error!" });
    } else {
      console.log("get_top10 job data!");
      console.log("top 10 jobs results", result);
      res.status(200).send({ result: result });
    }
  });
};

exports.getlasttenjobposts = function(req, res) {
  //console.log(req.body);
  var user = {
    username: req.params.id //"abc@gmail.com"
  };
  console.log("inside get last ten job data req");
  kafka.make_request("get_last10_job_topic", user, function(err, result) {
    console.log("in get_last10_job_topic");
    //  console.log(req.body);
    if (err) {
      console.log("err", err);
      res.status(500).send({ message: "Server Error!" });
    } else {
      console.log("get_last10 job data!");
      console.log("last  10 jobs results", result);
      res.status(200).send({ result: result });
    }
  });
};

exports.getcitywisedata = function(req, res) {
  //console.log(req.body);
  var Job = {
    jobId: req.params.id //"5bf31c53def01f0dd81e2449"
  };
  console.log("inside get last ten job data req");
  kafka.make_request("get_city_wise_topic", Job, function(err, result) {
    console.log("in get_city_wise_topic");
    //  console.log(req.body);
    if (err) {
      console.log("err", err);
      res.status(500).send({ message: "Server Error!" });
    } else {
      console.log("get_city_wise_ job data!");
      console.log("city wise jobs results", result);
      res.status(200).send({ result: result });
    }
  });
};

exports.getprofileviews = function(req, res) {
  //console.log(req.body);
  var user = {
    username: req.params.id //req.session.user //req.session.user //"aehari2010@gmail.com"
  };
  console.log("inside profile views data req");
  kafka.make_request("get_profile_views", user, function(err, result) {
    console.log("in get_profile_views");
    //  console.log(req.body);
    if (err) {
      console.log("err", err);
      res.status(500).send({ message: "Server Error!" });
    } else {
      console.log("get_profile_views job data!");
      console.log("profile views results", result);
      res.status(200).send({ result: result });
    }
  });
};
