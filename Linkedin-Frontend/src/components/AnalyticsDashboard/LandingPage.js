import React, { Component } from "react";
import Chart from "../../components/AnalyticsDashboard/Chart";
import { HorizontalBar, Bar, Line, Pie } from "react-chartjs-2";
import Header from "../Header/Header";
import axios from "axios";
import { Link } from "react-router-dom";
import { Redirect } from "react-router";
import { connect } from "react-redux";
//var _ = require("underscore");
class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: {},
      jobData: {},
      savedJobData: {},
      clickJobData: {},
      selectedJobData: {},
      JobHistory: [],
      showjoblist: false,
      isshowbar: false,
      showClickGraph: false,
      showSavedJobs: false,
      currentPage: 1,
      todosPerPage: 2
    };
    this.handleClickPage = this.handleClickPage.bind(this);
    //this.getselectedJobData = this.getselectedJobData.bind(this);
  }
  static defaultProps = {
    displayTitle: true,
    displayLegend: true,
    legendPosition: "right",
    location: "City"
  };
  async componentWillMount() {
    //  this.getClickedData();
    // this.getSavedJobData();
    // this.getJobList();
  }
  componentDidMount() {
    if (
      this.props.loginStateStore !== null &&
      this.props.loginStateStore !== undefined
    ) {
      this.getClickedData();
      this.getSavedJobData();
      this.getJobList();
    }
  }
  handleClickPage(event) {
    this.setState({
      ...this.state,
      currentPage: Number(event.target.id)
    });
  }

  getClickedData() {
    var labeldb = [];
    var labeldatadb = [];

    axios.defaults.withCredentials = true;
    axios
      .get(
        "http://localhost:3001/getuserclicks/" +
          this.props.loginStateStore.email
      )
      .then(
        response => {
          console.log("Clicke job data from db", response.data.result);
          var clickedJobdatadb = [];
          clickedJobdatadb = response.data.result;

          var counterdb = {};
          clickedJobdatadb.forEach(function(obj) {
            // console.log("obj.jobData.jobId", obj.jobData.jobId);
            var key =
              obj.jobData.jobData.jobId + " " + obj.jobData.jobData.jobTitle;
            counterdb[key] = (counterdb[key] || 0) + 1;

            var resultClickedJobsdb = Object.keys(counterdb).map(function(key) {
              var key1 = key.substr(key.indexOf(" ") + 1);
              return [key1, counterdb[key]];
            });
            //   console.log(result.length, "is the length");
            var i;

            for (i = 0; i < resultClickedJobsdb.length; i++) {
              labeldb[i] = resultClickedJobsdb[i][0];
              labeldatadb[i] = resultClickedJobsdb[i][1];
            }
          });
          console.log("labelk for db", labeldb);
          console.log("labeldayta for db", labeldatadb);
          //   console.log("counter db is", counterdb);
          this.setState({
            ...this.state,
            clickJobData: {
              labels: labeldb,
              datasets: [
                {
                  label: "Most Clicked Jobs",
                  data: labeldatadb,
                  backgroundColor: [
                    "rgba(255, 99, 132, 0.6)",
                    "rgba(54, 162, 235, 0.6)",
                    "rgba(255, 206, 86, 0.6)",
                    "rgba(75, 192, 192, 0.6)",
                    "rgba(153, 102, 255, 0.6)",
                    "rgba(255, 159, 64, 0.6)",
                    "rgba(255, 99, 132, 0.6)"
                  ]
                }
              ]
            },
            showClickGraph: true
          });
        },
        error => {
          // dispatch(alertActions.projectPostError(error.data.message));
        }
      );
    //console.log("labeldb.length", labeldb.length);
  }
  getSavedJobData() {
    var labelsavedjob = [];
    var datasavedjob = [];
    if (
      this.props.loginStateStore !== null &&
      this.props.loginStateStore !== undefined
    ) {
      axios.defaults.withCredentials = true;
      axios
        .get(
          "http://localhost:3001/getsavedjobs/" +
            this.props.loginStateStore.email
        )
        .then(
          response => {
            console.log("saved job data from the db", response.data.result);
            var clickedJobdatadb = [];
            clickedJobdatadb = response.data.result;

            var countersavedjob = {};
            clickedJobdatadb.forEach(function(obj) {
              //  console.log("obj.jobData.jobId", obj.jobId);
              var key = obj.jobId + " " + obj.jobTitle;
              countersavedjob[key] = (countersavedjob[key] || 0) + 1;

              var resultsavedJobs = Object.keys(countersavedjob).map(function(
                key
              ) {
                var key1 = key.substr(key.indexOf(" ") + 1);
                return [key1, countersavedjob[key]];
              });
              console.log(resultsavedJobs, "is the length");
              var i;

              for (i = 0; i < resultsavedJobs.length; i++) {
                labelsavedjob[i] = resultsavedJobs[i][0];
                datasavedjob[i] = resultsavedJobs[i][1];
              }
            });
            console.log("label saved job  for db", labelsavedjob);
            console.log("label saved jab data for db", datasavedjob);
            this.setState({
              ...this.state,
              savedJobData: {
                labels: labelsavedjob,
                datasets: [
                  {
                    label: "Most Saved Jobs",
                    data: datasavedjob,
                    backgroundColor: [
                      "rgba(255, 99, 132, 0.6)",
                      "rgba(54, 162, 235, 0.6)",
                      "rgba(255, 206, 86, 0.6)",
                      "rgba(75, 192, 192, 0.6)",
                      "rgba(153, 102, 255, 0.6)",
                      "rgba(255, 159, 64, 0.6)",
                      "rgba(255, 99, 132, 0.6)"
                    ]
                  }
                ]
              },
              showSavedJobs: true
            });
          },
          error => {
            // dispatch(alertActions.projectPostError(error.data.message));
          }
        );
    }
  }

  getJobList() {
    var labeldb = [];
    var joblistdata = [];
    if (
      this.props.loginStateStore !== null &&
      this.props.loginStateStore !== undefined
    ) {
      var data = {
        username: this.props.loginStateStore.email
      };
      axios.defaults.withCredentials = true;
      axios.post("http://localhost:3001/JobPostingHistory", data).then(
        response => {
          // console.log("job list job data from db", response.data.value);
          joblistdata = response.data.value;
          console.log("joblistdata", joblistdata);
          this.setState({
            ...this.state,
            JobHistory: joblistdata,
            showjoblist: true
          });
        },
        error => {
          // dispatch(alertActions.projectPostError(error.data.message));
        }
      );
    }
  }

  getselectedJobData = jobId => {
    console.log("job id is", jobId);
    var labelselectedjob = [];
    var selectedjobData = [];
    var jobformAnalytics = [];
    var jobFormData = [];
    console.log("inside job selected data");
    axios.defaults.withCredentials = true;
    axios.get("http://localhost:3001/getjobformanalytics/" + jobId).then(
      response => {
        // console.log("job list job data from db", response.data.value);
        jobformAnalytics = response.data;
        console.log("getjobformanalytics data", jobformAnalytics.HalfFilled);
        jobFormData = [
          jobformAnalytics.HalfFilled,
          jobformAnalytics.Viewed,
          jobformAnalytics.Completed
        ];
        this.setState({
          ...this.state,
          selectedJobData: {
            labels: ["Half Filled", "Viewed", "Completely Filled"],
            datasets: [
              {
                label: "Most Saved Jobs",
                data: jobFormData,
                backgroundColor: [
                  "rgba(255, 99, 132, 0.6)",
                  "rgba(54, 162, 235, 0.6)",
                  "rgba(255, 206, 86, 0.6)",
                  "rgba(75, 192, 192, 0.6)",
                  "rgba(153, 102, 255, 0.6)",
                  "rgba(255, 159, 64, 0.6)",
                  "rgba(255, 99, 132, 0.6)"
                ]
              }
            ]
          }
        });
      },
      error => {
        // dispatch(alertActions.projectPostError(error.data.message));
      }
    );
  };
  render() {
    var redirectVar = null;
    console.log(this.props.loginStateStore);
    if (!this.props.loginStateStore) {
      redirectVar = <Redirect to="/signup" />;
    }
    let redirecty_value = null;
    const { currentPage, todosPerPage } = this.state;

    const indexOfLastTodo = currentPage * todosPerPage;
    const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
    let currentTodos = null;
    let renderPageNumbers = null;
    console.log("currenttodo", indexOfLastTodo);
    let showbar = null;
    let jobList = null;
    let showGraph = null;
    console.log("chart", this.state.chartData);
    console.log("jobdata", this.state.jobData);
    console.log("savedJobData", this.state.savedJobData);
    console.log("clickJobData", this.state.clickJobData);
    console.log("clickJobDatalength", this.state.clickJobData.length);
    if (this.state.showjoblist === true)
      showbar = (
        <Pie
          data={this.state.selectedJobData}
          options={{
            title: {
              display: false,
              text: "Saved Jobs", // + this.props.location,
              fontSize: 25
            },
            legend: {
              display: this.props.displayLegend,
              position: this.props.legendPosition
            }
          }}
        />
      );
    if (this.state.showjoblist === true) {
      currentTodos = this.state.JobHistory.slice(
        indexOfFirstTodo,
        indexOfLastTodo
      );
      const pageNumbers = [];
      for (
        let i = 1;
        i <= Math.ceil(this.state.JobHistory.length / todosPerPage);
        i++
      ) {
        pageNumbers.push(i);
      }
      renderPageNumbers = pageNumbers.map(number => {
        return (
          <button
            class="backgroundbutt btn"
            key={number}
            id={number}
            onClick={this.handleClickPage}
            class="colorful"
          >
            {number}
          </button>
        );
      });
      redirecty_value = currentTodos.map((job, index) => {
        return (
          <div>
            <div
              className="job-result-data p-3 mt-2 mb-2 row border"
              key={index}
            >
              <span className="job-logo-container col-lg-2">
                <img
                  className="job-logo"
                  src="https://media.licdn.com/dms/image/C4D0BAQHcZzoBjmYdvA/company-logo_200_200/0?e=1550102400&v=beta&t=oXB0dGr7pUu2H-c8gPeoMDbl2cVIMSMXInCOZ74fjJc"
                  alt="company-logo"
                />
              </span>
              <span className="col-lg-10">
                <div className="">
                  <b onClick={() => this.getselectedJobData(job.jobId)}>
                    {job.jobTitle}
                    {/* <Link to="#">{job.jobTitle}</Link> */}
                  </b>
                  <br />
                </div>
                <div className="">
                  <b>{job.companyName}</b>
                </div>
                <div>{job.location}</div>
                <small className="text-muted">
                  <p className="overflow-ellipsis">{job.jobDescription}</p>
                </small>
                <small className="text-muted">{job.postedDate}</small>
              </span>
            </div>
          </div>
        );
      });
    }
    if (
      this.state.showClickGraph === true &&
      this.state.showSavedJobs === true &&
      this.state.showjoblist === true
    ) {
      showGraph = (
        <Chart
          chartData={this.state.jobData}
          savedJobData={this.state.savedJobData}
          clickJobData={this.state.clickJobData}
          location="Massachusetts"
          legendPosition="bottom"
        />
      );
    }

    return (
      <div>
        {redirectVar}
        <Header />
        <div>
          <br />
          {showGraph}
        </div>
        <hr />
        <div className="row">
          <div className="col-md-5">{redirecty_value}</div>
          <div className="col-md-2" />

          <div className="col-md-5">
            <div>{showbar}</div>{" "}
            <div>
              <button className="btn btn-default">
                <Link to={"/recruiter/dashboard"}>Next</Link>
              </button>
            </div>
          </div>
        </div>
        <div>{renderPageNumbers}</div>
      </div>
    );
  }
}

//export default LandingPage;
function mapStateToProps(state) {
  return { loginStateStore: state.Login.result };
}
export default connect(
  mapStateToProps,
  {}
)(LandingPage);
