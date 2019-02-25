var connection = new require("./kafka/connections");
var mongoose = require("mongoose");
var applicantsignup = require("./services/applicantsignup");
var recruitersignup = require("./services/recruitersignup");
var user_login = require("./services/userLoginKafka");
var postJob_recruiter = require("./services/postJobRecruiterKafka");
var getJobs = require("./services/getJobs");
var saveJob = require("./services/saveJob");
var savedJobs = require("./services/savedJobs");
var applyJob = require("./services/applyJob");
var userclicktrack = require("./services/userclick");
var getAppliedJobs = require("./services/getAppliedJobs");
var jobPostingHistory = require("./services/jobPostingHistory");
var getProfile = require("./services/getProfile");
var getInterestedJobs = require("./services/getInterestedJobs");
var jobsearch = require("./services/jobsearch");
var sendConnectionRequest = require("./services/sendConnectionRequest");
var getPendingRequests = require("./services/getPendingRequests");
var ignoreRequest = require("./services/ignoreRequest");
var acceptRequest = require("./services/acceptRequest");
var getConnections = require("./services/getConnections");
var logJobViewed = require("./services/logJobViewed");
var logAppHalffilled = require("./services/logAppHalffilled");
var logApplicationSubmitted = require("./services/logApplicationSubmitted");
var editJobRecruiter = require("./services/editJobRecruiter");
//pratik -  code starts

var fetchprofile = require("./services/fetchprofile");
var updatepersonaldetails = require("./services/updatepersonaldetails");
var updateskills = require("./services/updateskills");
var updateexperience = require("./services/updateexperience");
var updateeducation = require("./services/updateeducation");
//pratik- code ends
var logProfileView = require("./services/logProfileView");
var searchPeople = require("./services/searchPeople");
var getProfileData = require("./services/getProfileData");

//Analytics
var userclicktrack = require("./services/userclick");
var getuserclicks = require("./services/getUserClicks");
var getsavedjobs = require("./services/getsavedjobAnalytics");
var jobPostingHistory = require("./services/jobPostingHistory");
var jobformanalytics = require("./services/getjobformanalytics");
var jobpostsanalytics = require("./services/gettoptenjobpostings");
var jobpostslastten = require("./services/getlasttenjobpostings");
var citywisejobdata = require("./services/getcitywisejobdata");
var sendMessages = require("./services/sendMessages");
var getMessages = require("./services/getMessages");
var getProfileDataUpdated = require("./services/getProfileDataUpdated");
var getprofileviews = require("./services/getprofileviews");
var deleteAccount = require('./services/deleteAccount');

function handleTopicRequest(topic_name, fname) {
  var consumer = connection.getConsumer(topic_name);
  var producer = connection.getProducer();
  console.log("server is running ");
  consumer.on("message", function(message) {
    console.log("message received for " + topic_name + " ", fname);
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);

    fname.handle_request(data.data, function(err, res) {
      console.log("after handle" + res);
      var payloads = [
        {
          topic: data.replyTo,
          messages: JSON.stringify({
            correlationId: data.correlationId,
            data: res
          }),
          partition: 0
        }
      ];
      producer.send(payloads, function(err, data) {
        console.log(data);
      });
      return;
    });
  });
}

handleTopicRequest("user_login_topic", user_login);
handleTopicRequest("applicant_signup_topic", applicantsignup);
handleTopicRequest("recruiter_signup_topic", recruitersignup);
handleTopicRequest("postJob_recruiter_topic", postJob_recruiter);
handleTopicRequest("get_jobs_topic", getJobs);
handleTopicRequest("save_job_topic", saveJob);
handleTopicRequest("saved_jobs_topic", savedJobs);
handleTopicRequest("apply_job_topic", applyJob);
handleTopicRequest("user_click_topic", userclicktrack);
handleTopicRequest("get_applied_jobs_topic", getAppliedJobs);
handleTopicRequest("job_posting_history_topic", jobPostingHistory);
handleTopicRequest("get_profile_topic", getProfile);
handleTopicRequest("get_interested_jobs", getInterestedJobs);
handleTopicRequest("jobsearch_topic", jobsearch);
handleTopicRequest("send_connection_request", sendConnectionRequest);
handleTopicRequest("get_pending_requests", getPendingRequests);
handleTopicRequest("ignore_request_topic", ignoreRequest);
handleTopicRequest("accept_request_topic", acceptRequest);
handleTopicRequest("get_connections_topic", getConnections);
handleTopicRequest("log_job_viewed_topic", logJobViewed);
handleTopicRequest("log_app_halffilled_topic", logAppHalffilled);
handleTopicRequest("log_application_submitted_topic", logApplicationSubmitted);
handleTopicRequest("editJob_recruiter_topic", editJobRecruiter);
//pratiks topic starts - edit profile topics
handleTopicRequest("fetchprofile1_topic", fetchprofile);
handleTopicRequest("updatepd_topic", updatepersonaldetails);
handleTopicRequest("updateskills_topic", updateskills);
handleTopicRequest("updateexp_topic", updateexperience);
handleTopicRequest("updateedu_topic", updateeducation);
//pratiks topic ends
handleTopicRequest("log_profile_view_topic", logProfileView);
handleTopicRequest("searchPeople_topic", searchPeople);
handleTopicRequest("get_profile_data_topic", getProfileData);

//Analytics
handleTopicRequest("user_click_topic", userclicktrack);
handleTopicRequest("get_userclicks_topic", getuserclicks);
handleTopicRequest("get_savedjobs_topic", getsavedjobs);
handleTopicRequest("job_posting_history_topic", jobPostingHistory);
handleTopicRequest("get_job_form_analytics_topic", jobformanalytics);
handleTopicRequest("get_top10_job_topic", jobpostsanalytics);
handleTopicRequest("get_last10_job_topic", jobpostslastten);
handleTopicRequest("get_city_wise_topic", citywisejobdata);
handleTopicRequest("send_messages_topic", sendMessages);
handleTopicRequest("get_messages_topic", getMessages);
handleTopicRequest("get_profile_data_updated_topic", getProfileDataUpdated);
handleTopicRequest("get_profile_views", getprofileviews);
handleTopicRequest('delete_profile_topic', deleteAccount);
