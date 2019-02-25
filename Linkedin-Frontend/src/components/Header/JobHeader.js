import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../../static/css/Navbar.css";
import { connect } from "react-redux";
import { login } from "../../actions/LoginAction";
import { Redirect } from "react-router";
import Header from "../Header/JobHeader";
import { saveSearchPeopleFieldToStore } from "../../actions/peopleSearchAction";
import profilePic from "../pp.jpg";

class JobHeader extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.handleLogout = this.handleLogout.bind(this);
    this.state = {
      redirectToHome: false,
      redirectToPeopleResultsPage: false
    };

    //bind
    this.handleLogoClick = this.handleLogoClick.bind(this);
    this.searchResultsHandler = this.searchResultsHandler.bind(this);
    this.queryChangeHandler = this.queryChangeHandler.bind(this);
  }

  handleLogoClick = () => {
    this.setState({
      redirectToHome: true
    });
  };
  handleLogout = () => {
    window.location.reload();
  };

  searchResultsHandler = e => {
    var data = {
      query: this.state.query
    };
    console.log("Inside search results");

    this.props.saveSearchPeopleFieldToStore(data);
    this.setState({
      redirectToPeopleResultsPage: true
    });
  };

  queryChangeHandler = e => {
    this.setState({
      query: e.target.value
    });
  };

  render() {
    {
      var recruiterDropdown = null;
      var redirectVar = null;
      console.log(this.state.redirectToPeopleResultsPage);
      if (this.state.redirectToPeopleResultsPage == true) {
        redirectVar = <Redirect to="/people/results" />;
      }

      // var redirectVar =null;
      if (this.state.redirectToHome === true) {
        redirectVar = <Redirect to="/home" />;
      }
      let recruiterHeader = null;
      if (
        this.props &&
        this.props.loginStateStore &&
        this.props.loginStateStore.responseFlag
      ) {
        if (this.props.loginStateStore.accountType == "2") {
          recruiterHeader = (
            <li className="nav-item">
              <Link className="nav-link" to="/jobs/add-job">
                <center>
                  <i className="fas fa-suitcase" />
                </center>
                Post Job
              </Link>
            </li>
          );
          recruiterDropdown = (
            <div>
              {" "}
              <li>
                <span className="glyphicon glyphicon-log-out">
                  <Link to="/analytics-dashboard" className="text-dark">
                    Dashboard
                  </Link>
                </span>
              </li>
              <li>
                <span className="glyphicon glyphicon-log-out">
                  <Link to="/jobs/posting-details" className="text-dark">
                    Posted Jobs
                  </Link>
                </span>
              </li>
            </div>
          );
        }
      }
      return (
        <div className="header-container">
          {redirectVar}
          <nav className="navbar navbar-expand-md jobheader">
            <div className="container">
              <img
                className="img-container linkedIn-logo"
                src="http://www.theredbrickroad.com/wp-content/uploads/2017/05/linkedin-logo-copy.png"
                alt="logo"
              />
              <input
                className="search-box rounded"
                value={this.state.query}
                onChange={this.queryChangeHandler}
                type="text"
                placeholder="Search"
              />
              <button
                className="btn btn-outline-success btn-login my-2 my-sm-0"
                type="submit"
                onClick={this.searchResultsHandler}
              >
                Search
              </button>
            </div>

            <div
              className="collapse navbar-collapse navbar-right nav-links"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/home">
                    <center>
                      <i className="fas fa-home" />
                    </center>
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/my-network">
                    <center>
                      <i className="fas fa-user-friends" />
                    </center>
                    My Network
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/jobs">
                    <center>
                      <i className="fas fa-briefcase" />
                    </center>
                    Jobs
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/inbox">
                    <center>
                      <i className="fas fa-envelope object-align-top" />
                    </center>
                    Messaging
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="#">
                    <center>
                      <i className="fas fa-bell" />
                    </center>
                    Notifications
                  </Link>
                </li>
                <li className="nav-item">
                  <ul className="nav navbar-nav">
                    <li className="dropdown">
                      <Link
                        to="#"
                        className="dropdown-toggle dropdownFontColor"
                        data-toggle="dropdown"
                      >
                        {/* <img src=""/> */}
                        <img
                          src={profilePic}
                          className="homeProfileImage"
                          height="30"
                          className="profileimage"
                        />
                        <br />
                        Me
                        <span className="glyphicon glyphicon-user pull-right" />
                      </Link>
                      <ul className="dropdown-menu">
                        {recruiterDropdown}
                        <li className="dropdownFontColor">
                          <span className="glyphicon glyphicon-log-out pull-right">
                            <Link to="/profile" className="text-dark">
                              Profile
                            </Link>
                          </span>
                        </li>
                        {/* <li><Link to= "/jobs/posting-details">Posted Jobs</Link><span className="glyphicon glyphicon-log-out pull-right"></span></li> */}
                        {/* <li><a>Profile<span className="glyphicon glyphicon-log-out pull-right"></span></a></li> */}
                        <li className="divider" />
                        <li className="dropdownFontColor">
                          <span className="glyphicon glyphicon-log-out pull-right">
                            <Link
                              to="/applicant/dashboard"
                              className="text-dark"
                            >
                              Profile DashBoard
                            </Link>
                          </span>
                        </li>
                        {/* <li><Link to= "/jobs/posting-details">Posted Jobs</Link><span className="glyphicon glyphicon-log-out pull-right"></span></li> */}
                        {/* <li><a>Profile<span className="glyphicon glyphicon-log-out pull-right"></span></a></li> */}
                        <li className="divider" />
                        <li>
                          <span className="glyphicon glyphicon-log-out">
                            <Link
                              to="/login"
                              onClick={this.handleLogout}
                              className="text-dark"
                            >
                              Sign Out
                            </Link>
                          </span>
                        </li>
                        {/* <li><Link onClick = {this.handleLogout} to="#">Sign Out<span className="glyphicon glyphicon-log-out pull-right"></span></Link></li> */}
                      </ul>
                    </li>
                  </ul>
                </li>

                {recruiterHeader}
                {/* <li className="nav-item">
              <a className="nav-link" href="#"><center><i className="fas fa-suitcase"></i></center><Link to= "/jobs/add-job">Post a Job</Link></a>
            </li> */}
              </ul>
            </div>
          </nav>
        </div>
      );
    }
  }
}

const mapStateToProps = state => ({
  saveSearchPeopleFieldToStore: state.peopleSearchFieldsStateStore,
  loginStateStore: state.Login.result
});

/* function mapStateToProps (state) {
  console.log("Login state update",state.Login.result);
  return { loginStateStore : state.Login.result };
} */
export default connect(
  mapStateToProps,
  { saveSearchPeopleFieldToStore }
)(JobHeader);
// export default JobHeader;
