import React, { Component } from "react";
import RecruiterChart from "../../components/AnalyticsDashboard/RecruiterChart";
import { HorizontalBar, Bar, Line, Pie } from "react-chartjs-2";
import { Link } from "react-router-dom";
import Header from "../Header/Header";
import { Redirect } from "react-router";
import { connect } from "react-redux";
import axios from "axios";
class ApplicantDashoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profileviewdata: {},
      showprofileviews: false
    };
    //  this.handleClickPage = this.handleClickPage.bind(this);
  }
  componentDidMount() {
    this.getviews();
  }
  static defaultProps = {
    displayTitle: true,
    displayLegend: true,
    legendPosition: "right",
    location: "City"
  };
  getviews() {
    var labeltoptenjob = [];
    var datatoptenjob = [];
    if (
      this.props.loginStateStore !== null &&
      this.props.loginStateStore !== undefined
    ) {
      axios.defaults.withCredentials = true;
      axios
        .get(
          "http://localhost:3001/getprofileviews/" +
            this.props.loginStateStore.email
        )
        .then(
          response => {
            console.log(
              "top 10 job data from the db",
              response.data.result.value
            );
            var topTenJobdatadb = [];
            topTenJobdatadb = response.data.result.value;

            var countertoptenjob = {};
            topTenJobdatadb.forEach(function(obj) {
              //  console.log("obj.jobData.jobId", obj.jobId);
              var key = obj.viewTime;
              // countertoptenjob[key] = obj.size;
              countertoptenjob[key] = (countertoptenjob[key] || 0) + 1;
              var resulttopJotenjobs = Object.keys(countertoptenjob).map(
                function(key) {
                  //    var key1 = key.substr(key.indexOf(" ") + 1);
                  return [key, countertoptenjob[key]];
                }
              );
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
              profileviewdata: {
                labels: labeltoptenjob,
                datasets: [
                  {
                    label: "Profile Views in the last 30 days",
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
              showprofileviews: true
            });
          },
          error => {
            // dispatch(alertActions.projectPostError(error.data.message));
          }
        );
    }
  }

  render() {
    var redirectVar = null;

    if (
      this.props.loginStateStore !== null &&
      this.props.loginStateStore !== undefined
    )
      console.log("loginStateStore", this.props.loginStateStore.email);
    if (!this.props.loginStateStore) {
      redirectVar = <Redirect to="/signup" />;
    }
    let showGraph = null;
    let showbar = null;

    if (this.state.showprofileviews === true)
      showbar = (
        <Bar
          data={this.state.profileviewdata}
          options={{
            title: {
              display: false,
              text: "Profile Views", // + this.props.location,
              fontSize: 25
            },
            legend: {
              display: this.props.displayLegend,
              position: this.props.legendPosition
            }
          }}
        />
      );

    return (
      <div>
        {redirectVar}
        <Header />
        <div>
          <br />
        </div>
        <hr />
        <div className="row">
          <div className="col-md-10">{showbar}</div>
        </div>
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
)(ApplicantDashoard);
