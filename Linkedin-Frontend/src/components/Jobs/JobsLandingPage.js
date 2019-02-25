import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {connect} from 'react-redux';
import {Redirect} from 'react-router';
import {saveSearchFieldToStore} from '../../actions/jobSearchAction';
import JobHeader from "../Header/JobHeader";
import "./JobsLanding.css";

import {saveSavedJobsToStore, saveAppliedobsToStore} from '../../actions/jobsLandingPageAction';

class JobsLandingPage extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    
    this.state = {
        redirectToJobResultsPage: false,
        savedJobsCount:0, 
        appliedJobsCount: 0,
        interestedJobs:{}
    }

    //bind
    this.searchResultsHandler = this.searchResultsHandler.bind(this);
    this.handleJobTitle = this.handleJobTitle.bind(this);
    this.handleLocation = this.handleLocation.bind(this);
    this.getSavedJobs = this.getSavedJobs.bind(this);
    this.getInterestedJobs = this.getInterestedJobs.bind(this);
  }

  componentDidMount(){

    if(this.props.loginStateStore){
      this.getInterestedJobs();
    this.getSavedJobs();
    this.getAppliedJobs();
    }
        
  }

  getInterestedJobs = ()=>{
    axios.defaults.withCredentials=true;
    axios.get('http://localhost:3001/get-interested-jobs')
      .then((response)=>{
          if(response.status === 200){
            console.log('Interested Jobs', response.data);
            this.setState({
              interestedJobs: response.data
            })
          }
      });
  }

  getSavedJobs = ()=>{
    axios.defaults.withCredentials=true;
    var data = {
      email : this.props.loginStateStore.email
    }
    axios.get('http://localhost:3001/saved-jobs/'+ this.props.loginStateStore.email)
            .then((response)=>{
                if(response.status === 200){
                    console.log('saved jobs: ', response.data);
                    console.log('saved jobs count', response.data.length);
                    this.setState({
                        savedJobs: response.data,
                        savedJobsCount: response.data.length
                    });
                }
    });
  }

  getAppliedJobs = ()=>{
    axios.defaults.withCredentials=true;
    axios.get('http://localhost:3001/getAppliedJobs/' + this.props.loginStateStore.email)
      .then((response)=>{
        if(response.status === 200){
          console.log('Response applied jobs', response.data);
          this.setState({
            appliedJobs: response.data,
            appliedJobsCount : response.data.length
          });
        }
      })
  }

  searchResultsHandler = (e) => {
    var data = {
        jobTitle : this.state.jobTitle,
        location : this.state.location
    }
    console.log("Inside search results")

    this.props.saveSearchFieldToStore(data);
    this.setState({
        redirectToJobResultsPage : true
      });
       
}

    handleJobTitle = (e) => {
        this.setState({
            jobTitle : e.target.value
        })
    }

    handleLocation = (e) => {
        this.setState({
            location : e.target.value
        })
    }

    render(){
        var redirectVar = null;
        console.log(this.state.redirectToJobResultsPage)

        if(!this.props.loginStateStore) {
            redirectVar = <Redirect to= "/login"/>
        }
        if(this.state.redirectToJobResultsPage == true){
          redirectVar = <Redirect to="/jobs/results"/>
        }

        if(this.state.savedJobs != null){
          this.props.saveSavedJobsToStore(this.state.savedJobs);
        }

        if(this.state.appliedJobs != null){
          this.props.saveAppliedobsToStore(this.state.appliedJobs);
        }

        if(this.state.interestedJobs.length > 0){
          var interestedJobs = this.state.interestedJobs.map(function(job, index){
            return(
              <div className="col-md-3" key={index}>
              <div className="card mb-3 shadow-sm pad-3-pc">
                <center><img className="card-img-top" src="https://media.licdn.com/dms/image/C560BAQEVpdy_-U0fSQ/company-logo_100_100/0?e=1550102400&v=beta&t=SvuPc-kCSrsuSLjz6Lb8NvXqT9YghI8I4RV5uG7jT0U" alt="Card image cap"/></center>
                <div className="card-body center-content">
                <p><b>{job.jobTitle}</b></p>
                <p>{job.companyName}</p>
                <p>{job.location}</p> 
                  {/* <div className="d-flex justify-content-between align-items-center">
                    <small className="text-muted">9 mins</small>
                  </div> */}
                </div>
              </div>
            </div>
            )
          });
        }



        return(
            <div>
                {redirectVar}
                <JobHeader />
                      <div className="jobs-landing-header-container pad-top-1-pc pb-3">
                        <form>
                            <input type = "text" onChange = {this.handleJobTitle} className = "jobs" placeholder = "Search Jobs"></input>
                            &nbsp;&nbsp;
                            
                            <input type = "text" onChange = {this.handleLocation} className = "location" placeholder = "Search Location"></input>
                            &nbsp;&nbsp;
                            <button onClick={this.searchResultsHandler} className="btn btn-outline-default white-outline btn-md searchbox-submit" type="button">
                            Search
                            </button>
                      </form>
                   </div>

                  {/* <div className="row"> */}
                      {/* <div className="jobs-search-alerts-container pull-center-1 col t-09 t-normal t-white nav-links">
                        Job search alerts:
                      </div>

                      <div className="jobs-search-alerts-container col-3 t-09 t-normal t-white nav-links">
                        <b>
                          <Link to="#">8 new jobs</Link>
                        </b>
                        for Software Engineer in San Jose, CA
                      </div>

                      <div className="jobs-search-alerts-container col-4 t-09 t-normal t-white nav-links">
                        <b>
                          <Link to="#">1 new job</Link>
                        </b>
                        for Software Development Engineer in San Jose, CA
                      </div>

                      <div className="jobs-search-alerts-container pull-center-2 col t-09 t-normal t-white nav-links">
                        <b>
                          <Link to="#">Manage alerts</Link>
                        </b>
                      </div> */}
                   {/* </div> */}

                   <div className = "jobs-landing-main-bg">

                        <div className="row mt-3 pull-center-1 pull-center-2">
                                    
                            <div className="jobs-landing-bar-container mb-3">
                                    <span className="p-3"><Link to="/jobs/saved-jobs">{this.state.savedJobsCount}  Saved Jobs</Link></span>
                                    <span className="pad-3-pc"><Link to="/jobs/applied-jobs">{this.state.appliedJobsCount} Applied Jobs</Link></span>
                                    <span className="pad-3-pc">Career Interests</span>
                                    <span className="pad-3-pc">LinkedIn Salary</span>
                                    <span className="pad-3-pc">Looking for talent?</span>
                                    <span className="pad-3-pc"><button className="btn linkedin-post-job" type="submit">Post a Job</button></span>
                                    

                            </div>                
                        </div>

        <div className="album py-5 bg-light">
        <div className="container">

        <div>
            <p><b>Jobs you may be interested in</b></p>
        </div>

          <div className="row">
            {interestedJobs}
          </div>
        </div>
      </div>

        
                    
            </div>

            </div>
         
      // </div>
    );
  }
}

//mapStateToProps

const mapStateToProps  = state =>({
    saveSearchFieldToStore : state.jobSearchFieldsStateStore,
    loginStateStore : state.Login.result
  });
  
  
//export default JobsLandingPage;
export default connect(mapStateToProps, {saveSearchFieldToStore, saveSavedJobsToStore, saveAppliedobsToStore})(JobsLandingPage);
