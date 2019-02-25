import React, { Component } from "react";
import RecruiterChart from "../../components/AnalyticsDashboard/RecruiterChart";
import { HorizontalBar, Bar, Line, Pie } from "react-chartjs-2";
import { Link } from "react-router-dom";
import Header from "../Header/Header";
import { Redirect } from "react-router";
import { connect } from "react-redux";
import axios from "axios";
class RecruiterDashoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toptenjobdata: {},
      showtoptenjobs: false,
      lasttenjobdata: {},
      showlasttenjobs: false,
      JobHistory: [],
      showjoblist: false,
      selectedJobData: {},
      currentPage: 1,
      todosPerPage: 2
    };
    this.handleClickPage = this.handleClickPage.bind(this);
  }
  componentDidMount() {
    if (
      this.props.loginStateStore !== null &&
      this.props.loginStateStore !== undefined
    ) {
      this.gettoptenjobposts();
      this.getlasttenjobposts();
      this.getJobList();
    }
  }
  handleClickPage(event) {
    this.setState({
      ...this.state,
      currentPage: Number(event.target.id)
    });
  }
  gettoptenjobposts() {
    var labeltoptenjob = [];
    var datatoptenjob = [];
    axios.defaults.withCredentials = true;
    axios
      .get(
        "http://localhost:3001/gettoptenjobposts/" +
          this.props.loginStateStore.email
      )
      .then(
        response => {
          console.log("top 10 job data from the db", response.data.result);
          var topTenJobdatadb = [];
          topTenJobdatadb = response.data.result.value;

          var countertoptenjob = {};
          topTenJobdatadb.forEach(function(obj) {
            //  console.log("obj.jobData.jobId", obj.jobId);
            var key = obj._id;
            countertoptenjob[key] = obj.size;

            var resulttopJotenjobs = Object.keys(countertoptenjob).map(function(
              key
            ) {
              //    var key1 = key.substr(key.indexOf(" ") + 1);
              return [key, countertoptenjob[key]];
            });
            console.log(resulttopJotenjobs, "is the length");
            var i;

            for (i = 0; i < resulttopJotenjobs.length; i++) {
              labeltoptenjob[i] = resulttopJotenjobs[i][0];
              datatoptenjob[i] = resulttopJotenjobs[i][1];
            }
          });
          console.log("label saved job  for db", labeltoptenjob);
          console.log("label saved jab data for db", datatoptenjob);
          this.setState({
            ...this.state,
            toptenjobdata: {
              labels: labeltoptenjob,
              datasets: [
                {
                  label: "Top 10 Jobs with highest applicants",
                  data: datatoptenjob,
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
            showtoptenjobs: true
          });
        },
        error => {
          // dispatch(alertActions.projectPostError(error.data.message));
        }
      );
  }

  getlasttenjobposts() {
    var labellasttenjob = [];
    var datalasttenjob = [];
    axios.defaults.withCredentials = true;
    axios
      .get(
        "http://localhost:3001/getlasttenjobposts/" +
          this.props.loginStateStore.email
      )
      .then(
        response => {
          console.log("last 10 job data from the db", response.data.result);
          var lastTenJobdatadb = [];
          lastTenJobdatadb = response.data.result.value;

          var counterlasttenjob = {};
          lastTenJobdatadb.forEach(function(obj) {
            //  console.log("obj.jobData.jobId", obj.jobId);
            var key = obj._id;
            counterlasttenjob[key] = obj.size;

            var resultlasttenjobs = Object.keys(counterlasttenjob).map(function(
              key
            ) {
              //    var key1 = key.substr(key.indexOf(" ") + 1);
              return [key, counterlasttenjob[key]];
            });
            console.log(resultlasttenjobs, "is the length");
            var i;

            for (i = 0; i < resultlasttenjobs.length; i++) {
              labellasttenjob[i] = resultlasttenjobs[i][0];
              datalasttenjob[i] = resultlasttenjobs[i][1];
            }
          });
          console.log("label last  job  for db", labellasttenjob);
          console.log("label last job data for db", datalasttenjob);
          this.setState({
            ...this.state,
            lasttenjobdata: {
              labels: labellasttenjob,
              datasets: [
                {
                  label: "Top 10 Jobs with fewer applicants",
                  data: datalasttenjob,
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
            showlasttenjobs: true
          });
        },
        error => {
          // dispatch(alertActions.projectPostError(error.data.message));
        }
      );
  }

  getselectedJobData = jobId => {
    console.log("job id is", jobId);
    var labelselectedjob = [];
    var selectedjobData = [];
    var citywisedatadb = [];
    var jobFormData = [];
    console.log("inside city job selected data");
    axios.defaults.withCredentials = true;
    axios.get("http://localhost:3001/getcitywisejobdata/" + jobId).then(
      response => {
        // console.log("job list job data from db", response.data.value);
        citywisedatadb = response.data.result[0].applicantData;
        console.log("city wise  data", citywisedatadb);

        var countercitywisejob = {};
        citywisedatadb.forEach(function(obj) {
          console.log("obj.jobData.jobId", obj);
          var key = obj.city;
          countercitywisejob[key] = (countercitywisejob[key] || 0) + 1;
          //  console.log("countercitywisejob", countercitywisejob);
          var resultcitywisejobs = Object.keys(countercitywisejob).map(function(
            key
          ) {
            //  console.log("object key", countercitywisejob);
            //    var key1 = key.substr(key.indexOf(" ") + 1);
            return [key, countercitywisejob[key]];
          });
          // console.log(resultcitywisejobs, "is the length");
          var i;

          for (i = 0; i < resultcitywisejobs.length; i++) {
            labelselectedjob[i] = resultcitywisejobs[i][0];
            selectedjobData[i] = resultcitywisejobs[i][1];
          }
        });
        console.log("label city wise job data", labelselectedjob);
        console.log("data city wise job data", selectedjobData);

        this.setState({
          ...this.state,
          selectedJobData: {
            labels: labelselectedjob,
            datasets: [
              {
                label: "Most Saved Jobs",
                data: selectedjobData,
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

  getJobList() {
    var labeldb = [];
    var joblistdata = [];

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

  render() {
    var redirectVar = null;
    console.log("login state store", this.props.loginStateStore);
    if (!this.props.loginStateStore) {
      redirectVar = <Redirect to="/signup" />;
    }
    let showGraph = null;
    let showbar = null;
    let redirecty_value = null;
    const { currentPage, todosPerPage } = this.state;

    const indexOfLastTodo = currentPage * todosPerPage;
    const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
    let currentTodos = null;
    let renderPageNumbers = null;
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
      this.state.showtoptenjobs === true &&
      this.state.showlasttenjobs === true &&
      this.state.showjoblist === true
    ) {
      console.log("toptenjobdata", this.state.toptenjobdata);
      showGraph = (
        <RecruiterChart
          toptenjobdata={this.state.toptenjobdata}
          lasttenjobdata={this.state.lasttenjobdata}
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
            {" "}
            <div>{showbar}</div>{" "}
            <div>
              <button className="btn btn-default">
                <Link to={"/analytics-dashboard"}>Prev</Link>
              </button>
            </div>
          </div>
        </div>
        <div>{renderPageNumbers}</div>
      </div>
    );
  }
}

//export default RecruiterDashoard;
function mapStateToProps(state) {
  return { loginStateStore: state.Login.result };
}
export default connect(
  mapStateToProps,
  {}
)(RecruiterDashoard);
