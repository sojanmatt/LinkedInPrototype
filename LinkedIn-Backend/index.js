var express = require("express");
var redis = require("redis");
var client = redis.createClient();

var app = express();
const multer = require("multer");
var bodyParser = require("body-parser");
var session = require("express-session");
var jobPosts = require("./model/jobPosts");
var cookieParser = require("cookie-parser");
const mongoClient = require("mongodb").MongoClient();
var mysql = require("mysql");
var { mongoose } = require("./mongoose");
const path = require("path");
const fs = require("fs");

var cors = require("cors");

//Passport authentication
var passport = require("passport");

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log("multer file", file);
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage });

//set up cors
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

var con = mysql.createPool({
  connectionLimit: 100,
  host: "linkedinteam1.c4redet1j4es.us-west-1.rds.amazonaws.com",
  user: "linkedin",
  password: "linkedin",
  database: "linkedin"
});

//set up session variable

app.use(
  session({
    secret: "linkedin",
    resave: false,
    saveUninitialized: false,
    duration: 60 * 60 * 100,
    activeDuration: 5 * 60 * 100
  })
);

app.use(bodyParser.json());

//Allow acceess control headers
app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  res.setHeader("Cache-Control", "no-cache");
  next();
});
//require('./app/routes')(app);
app.use(passport.initialize());

require("./config/passport")(passport);

//Kafka
var kafka = require("./kafka/client");
var applicantsignup = require("./controllers/applicantsignup");
var recruitersignup = require("./controllers/recruitersignup");
var postJobRecruiter = require("./controllers/postJobRecruiter");
var jobs = require("./controllers/jobs");
var saveJob = require("./controllers/saveJob");
var savedJobs = require("./controllers/savedJobs");
var jobsearch = require("./controllers/jobsearch");
var applyJob = require("./controllers/applyJob");
var jobPostingHistory = require("./controllers/jobPostingHistory");
var getProfile = require("./controllers/getProfile");
var getInterestedJobs = require("./controllers/getInterestedJobs");
var jobsearch = require("./controllers/jobsearch");
var sendConnectionRequest = require("./controllers/sendConnectionRequest");
var getPendingRequests = require("./controllers/getPendingRequests");
var ignoreRequest = require("./controllers/ignoreRequest");
var acceptRequest = require("./controllers/acceptRequest");
var getConnections = require("./controllers/getConnections");
var logJobViewed = require("./controllers/logJobViewed");
var logAppHalffilled = require("./controllers/logAppHalffilled");
var logApplicationSubmitted = require("./controllers/logApplicationSubmitted");
var logProfileView = require("./controllers/logProfileView");
var searchPeople = require("./controllers/searchPeople");
var submitEditedJobDetails = require("./controllers/submitEditedJobDetails");
var getProfileData = require("./controllers/getProfileData");
var getProfileDataUpdated = require('./controllers/getprofileDataUpdated');
var deleteAccount = require('./controllers/deleteAccount');

//Analytics
var analytics = require("./controllers/analytics");
//var jobPostingHistory = require("./controllers/jobPostingHistory");
var jobFormAnalytics = require("./controllers/jobFormAnalytics");
var sendMessage = require("./controllers/sendMessages");
var getMessages = require("./controllers/getMessages");

client.on("connect", function() {
  console.log("Redis client connected");
});

client.on("error", function(err) {
  console.log("Something went wrong " + err);
});
client.set("my test key", "my test value", redis.print);
client.get("my test key", function(error, result) {
  if (error) {
    console.log(error);
    throw error;
  }
  console.log("GET result ->" + result);
});

app.post("/download/:file(*)", (req, res) => {
  console.log("Inside download file", req.params);
  var file = req.params.file;
  var fileLocation = path.join(__dirname + "/uploads", file);
  var img = fs.readFileSync(fileLocation);
  var base64img = new Buffer(img).toString("base64");
  res.writeHead(200, { "Content-Type": "image/jpg" });
  res.end(base64img);
});

var getAppliedJobs = require("./controllers/getAppliedJobs");

app.post("/applicant/signup", (req, res) => {
  applicantsignup.applicantsignup(req, res);
});

app.get("/getProfileData/:id", (req, res) => {
  console.log("inside profiledata");
  getProfileData.getProfileData(req, res);
});

app.get("/deleteAccount/:id", (req, res) => {
  console.log("inside deleteAccount");
  deleteAccount.deleteAccount(req, res);
});

app.post("/peopleSearch", (req, res) => {
  console.log("in search people");
  console.log("search for:", req.body);
  //req.body.user = req.session.user;
  searchPeople.searchPeople(req, res);
});

app.post("/recruiter/signup", (req, res) => {
  console.log("inside recruiter");
  recruitersignup.recruitersignup(req, res);
});

app.post("/submitJobDetails", (req, res) => {
  console.log(req.body);
  req.body.user = req.body.username;
  console.log(req.session.user);
  postJobRecruiter.postJobRecruiter(req, res);
});

// app.get("/JobPostingHistory", (req, res) => {
//   // req.body.user = req.session.user;
//   console.log("inside job posting history");
//   jobPostingHistory.jobPostingHistory(req,res);
// });

var jwt = require("jsonwebtoken");
// Set up middleware
var requireAuth = passport.authenticate("jwt", { session: false });
const secret = "secret";

app.post("/login", function(req, res) {
  console.log("Inside Login Post Request", req.body);
  const query = req.body.username + req.body.password;
  kafka.make_request("user_login_topic", req.body, function(err, results) {
    console.log("in result");
    console.log(results.code);
    if (err) {
      console.log("Inside err");
      res.json({
        status: "error",
        msg: "System Error, Try Again."
      });
      console.log("mismatch login");
      res.value =
        "The email and password you entered did not match our records. Please double-check and try again.";
      console.log(res.value);
      res.sendStatus(400).end();
    } else if (results.code == 200) {
      var userResult = {
        email: results.value[0].email
      };
      req.session.user = results.value[0].email;
      /**Generating token */
      var token = jwt.sign(userResult, secret, {
        expiresIn: 10080 // in seconds
      });

      const responseJSON = { value: req.session.user, Token: token };
      // Save the Wikipedia API response in Redis store
      client.setex(
        `login:${query}`,
        3600,
        //source: "Redis Cache",
        JSON.stringify({ source: "Redis cache", value: results.value[0] })
      );
      console.log("respnose json", responseJSON);
      res.status(200).send({ value: results.value[0] });
    } else {
      res.value =
        "The email and password you entered did not match our records. Please double-check and try again.";
      res.sendStatus(400).end();
    }
  });
});
// // return client.get("/login", (err, result) => {
// const query = req.body.username + req.body.password;
// return client.get(`login:${query}`, (err, result) => {
//   console.log("result redis", JSON.stringify(result));
//   // If that key exist in Redis store
//   if (result) {
//     console.log("result redis", JSON.stringify(result));
//     const resultJSON = result;
//     req.session.user = req.body.username;
//     console.log(req.session.user);
//     return res.status(200).send(resultJSON);
//   } else {
//     kafka.make_request("user_login_topic", req.body, function(err, results) {
//       console.log("in result");
//       console.log(results.code);
//       if (err) {
//         console.log("Inside err");
//         res.json({
//           status: "error",
//           msg: "System Error, Try Again."
//         });
//         console.log("mismatch login");
//         res.value =
//           "The email and password you entered did not match our records. Please double-check and try again.";
//         console.log(res.value);
//         res.sendStatus(400).end();
//       } else if (results.code == 200) {
//         console.log("Inside else");
//         console.log("success login");
//         // res.value = user;
//         console.log(results);
//         console.log("session to be set", results.value[0].email);
//         req.session.user = results.value[0].email;
//         console.log("resres", results);
//         //res.sendStatus(200).end();
//         // const responseJSON = req.session.user;
//         const responseJSON = { value: req.session.user };
//         // Save the Wikipedia API response in Redis store
//         client.setex(
//           `login:${query}`,
//           3600,
//           //source: "Redis Cache",
//           JSON.stringify({ source: "Redis cache", value: results.value[0] })
//         );
//         console.log("respnose json", responseJSON);
//         res.status(200).send({ value: results.value[0] });
//       } else {
//         res.value =
//           "The email and password you entered did not match our records. Please double-check and try again.";
//         res.sendStatus(400).end();
//       }
//     });
//     }
//   });
// });

//****************************** */

// profile route starts -edit profile

app.post("/FetchProfile", function(req, res) {
  console.log("inside fetch profie route", req.body);

  kafka.make_request("fetchprofile1_topic", req.body, function(err, results) {
    console.log("Inside Profile Fetch ");
    console.log(typeof results);

    if (err) {
      console.log("Inside err");
      res.json({
        status: "error",
        msg: err
      });
    } else {
      if (typeof results === "string") {
        res.sendStatus(400).end();
      } else {
        res.code = "200";
        res.send({
          docs: results //docs:results.docs
        });
        console.log("Profile is popluated by data");
        res.end("Profile is populated");
      }
    }
  });
});

//axios profile save changes - Personal Details start

app.post("/updatepdprofile", function(req, res) {
  console.log("Inside Update Profile Post Request mlab");
  console.log("request body is", req.body);
  kafka.make_request("updatepd_topic", req.body, function(err, results) {
    console.log("Inside Personal detail Update Profile ");
    console.log(typeof results);

    if (err) {
      console.log("Inside err");
      res.json({
        status: "error",
        msg: err
      });
    } else {
      console.log("inside else1");
      if (results.code === "400") {
        // console.log(results.value);
        console.log("inside 400");
        res.sendStatus(400).end();
      } else if (results.code === "200") {
        res.code = "200";
        console.log(" PD is updated");
        res.sendStatus(200).end("PD of the profile is updated");
      }
    }
  });
});

//axios profile save changes - Personal Details end

//axios profile save changes - Experience start

app.post("/updateexpprofile", function(req, res) {
  console.log("Inside Update Profile Post Request mlab");
  console.log("request body is", req.body);
  kafka.make_request("updateexp_topic", req.body, function(err, results) {
    console.log("Inside Experience Update Profile ");
    console.log(typeof results);

    if (err) {
      console.log("Inside err");
      res.json({
        status: "error",
        msg: err
      });
    } else {
      console.log("inside else1");
      if (results.code === "400") {
        // console.log(results.value);
        console.log("inside 400");
        res.sendStatus(400).end();
      } else if (results.code === "200") {
        res.code = "200";
        console.log(" Experience is updated1233");
        res.sendStatus(200).end("Experience of the profile is updated");
      }
    }
  });
});

//axios profile save changes _ Experience end

//axios profile save changes _ Education start

app.post("/updateeduprofile", function(req, res) {
  console.log("Inside Update Profile Post Request mlab");
  console.log("request body is", req.body);
  kafka.make_request("updateedu_topic", req.body, function(err, results) {
    console.log("Inside Education Update Profile ");
    console.log(typeof results);

    if (err) {
      console.log("Inside err");
      res.json({
        status: "error",
        msg: err
      });
    } else {
      console.log("inside else1");
      if (results.code === "400") {
        // console.log(results.value);
        console.log("inside 400");
        res.sendStatus(400).end();
      } else if (results.code === "200") {
        res.code = "200";
        console.log(" Education is updated");
        res.sendStatus(200).end("Education of the profile is updated");
      }
    }
  });
});

//axios profile save changes _ Education end

//axios profile save changes _ Skills start

app.post("/updateskillsprofile", function(req, res) {
  console.log("Inside Update Profile Post Request mlab");
  console.log("request body is", req.body);
  kafka.make_request("updateskills_topic", req.body, function(err, results) {
    console.log("Inside Update Profile ");
    console.log(typeof results);

    if (err) {
      console.log("Inside err");
      res.json({
        status: "error",
        msg: err
      });
    } else {
      console.log("inside else1");
      if (results.code === "400") {
        // console.log(results.value);
        console.log("inside 400");
        res.sendStatus(400).end();
      } else if (results.code === "200") {
        res.code = "200";
        console.log(" Skills is updated");
        res.sendStatus(200).end("Skills of the profile is updated");
      }
    }
  });
});

app.post("/submitEditedJobDetails", (req, res) => {
  console.log("inside edit job post");
  console.log(req.body);
  req.body.user = req.body.username;
  //console.log(req.session.user);
  submitEditedJobDetails.submitEditedJobDetails(req, res);
});

//axios profile save changes _ Skills end

//profile route ends -edit profile

/**Analytics  Backend*/
app.post("/analytics/userclicks", function(req, res) {
  analytics.userclicks(req, res);
});

app.get("/getuserclicks/:id", function(req, res) {
  analytics.getuserclicks(req, res);
});
app.get("/getsavedjobs/:id", function(req, res) {
  analytics.getsavedjobs(req, res);
});
app.post("/JobPostingHistory", (req, res) => {
  // req.body.user = req.session.user;
  console.log("inside job posting history");
  console.log(req.body);
  jobPostingHistory.jobPostingHistory(req, res);
});
app.get("/getjobformanalytics/:id", (req, res) => {
  // req.body.user = req.session.user;
  console.log("inside job posting history");
  jobFormAnalytics.jobformanalytics(req, res);
});

app.get("/gettoptenjobposts/:id", (req, res) => {
  // req.body.user = req.session.user;
  console.log("inside top ten job posts");
  analytics.gettoptenjobposts(req, res);
});
app.get("/getlasttenjobposts/:id", (req, res) => {
  // req.body.user = req.session.user;
  console.log("inside last ten job posts");
  analytics.getlasttenjobposts(req, res);
});

app.get("/getcitywisejobdata/:id", (req, res) => {
  // req.body.user = req.session.user;
  console.log("inside get city wise job posts");
  analytics.getcitywisedata(req, res);
});
app.get("/getprofileviews/:id", (req, res) => {
  // req.body.user = req.session.user;
  console.log("inside get profile views");
  analytics.getprofileviews(req, res);
});

/**Analytics */

app.post("/upload_file", upload.any(), (req, res) => {
  res.send();
});

app.use("/jobs", jobs);
app.use("/jobsearch", jobsearch);

app.use("/save-job", saveJob);
app.use("/saved-jobs", savedJobs);
var analytics = require("./controllers/analytics");
app.post("/analytics/userclicks", function(req, res) {
  analytics.userclicks(req, res);
});
app.use("/get-interested-jobs", getInterestedJobs);

app.use("/apply-job", applyJob);
app.use("/getAppliedJobs", getAppliedJobs);
app.use("/get-profile", getProfile);
app.use("/send-connection-request", sendConnectionRequest);
app.use("/get-pending-requests", getPendingRequests);
app.use("/ignore-request", ignoreRequest);
app.use("/accept-request", acceptRequest);
app.use("/get-connections", getConnections);
app.use("/log-job-viewed", logJobViewed);
app.use("/log-app-halffilled", logAppHalffilled);
app.use("/log-application-submitted", logApplicationSubmitted);
app.use("/log-profile-view", logProfileView);
app.use("/get-profile-data", getProfileDataUpdated);

app.use("/sendmessage", sendMessage);
app.use("/getmessages", getMessages);
console.log("Linked Backend!");
app.listen(3001);
console.log("Server Listening on port 3001");
