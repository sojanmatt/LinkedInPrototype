import React, { Component } from "react";
import { Route } from "react-router-dom";
import Login from "./Login/Login";
import Signup from "./Signup/Signup";
import RecruiterSignup from "./Signup/RecruiterSignup";
import Home from "./Home/Home";
import Profile from "./Profile/Profile";
import MyNetwork from "./MyNetwork/MyNetwork";
import AnalysticsDashboardLandingPage from "./AnalyticsDashboard/LandingPage";
import AddJobs from "./Jobs/AddJob";
import ApplicationInfo from "./Jobs/ApplicationInfo";
import JobDisplayPage from "./Jobs/JobDisplayPage";
import JobPostingDetails from "./Jobs/JobPostingDetails";
import JobPostings from "./Jobs/JobPostings";
import JobsLandingPage from "./Jobs/JobsLandingPage";
import JobsResultsPage from "./Jobs/JobsResultsPage";
import PeopleSearch from "./PeopleSearch/PeopleSearch";
import RecruiterDashboard from "./AnalyticsDashboard/RecruiterDashboard";
import ApplicantDashboard from "./AnalyticsDashboard/ApplicantDashboard";

import SavedJobs from "./Jobs/SavedJobs";
import JobApplication from "./Jobs/JobApplication";
import EasyJobApplication from "./Jobs/EasyJobApplication";
import AppliedJobs from "./Jobs/AppliedJobs";
import PeopleProfile from "./Profile/PeopleProfile";
import MyMessages from "./MyMessages/Inbox";
import ViewApplicantResumePDF from "./ReactPDF/viewApplicantResumePDF";
import EditJobPost from "./Jobs/EditJobPost";

class Main extends Component {
  constructor(props) {
    super(props);
    console.log(props);
  }

  render() {
    return (
      <div>
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/recruiter-signup" component={RecruiterSignup} />
        <Route exact path="/" component={Home} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/profile" component={Profile} />
        <Route path="/my-network" component={MyNetwork} />
        <Route
          path="/analytics-dashboard"
          component={AnalysticsDashboardLandingPage}
        />
        <Route path="/recruiter/dashboard" component={RecruiterDashboard} />
        <Route path="/applicant/dashboard" component={ApplicantDashboard} />
        <Route path="/jobs/add-job" component={AddJobs} />
        <Route path="/jobs/app-info" component={ApplicationInfo} />
        <Route path="/jobs/display" component={JobDisplayPage} />
        <Route path="/jobs/posting-details" component={JobPostingDetails} />
        <Route path="/jobs/postings" component={JobPostings} />
        <Route exact path="/jobs" component={JobsLandingPage} />
        <Route path="/jobs/results" component={JobsResultsPage} />
        <Route path="/people/results" component={PeopleSearch} />
        <Route path="/jobs/saved-jobs" component={SavedJobs} />
        <Route path="/jobs/apply-job" component={JobApplication} />
        <Route path="/jobs/easy-apply-job" component={EasyJobApplication} />
        <Route path="/jobs/applied-jobs" component={AppliedJobs} />
        <Route path="/profile/:id" component={PeopleProfile} />
        <Route path="/mymessages" component={MyMessages} />
        <Route
          path="/viewApplicantResumePDF"
          component={ViewApplicantResumePDF}
        />
        <Route path="/jobs/edit-job-post" component={EditJobPost} />
        <Route path="/inbox" component={MyMessages} />
      </div>
    );
  }
}

export default Main;
