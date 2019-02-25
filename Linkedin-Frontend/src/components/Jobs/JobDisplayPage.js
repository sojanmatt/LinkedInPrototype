import React, { Component } from "react";
import "../../static/css/JobDisplay.css";

import {connect} from 'react-redux';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import {Link} from 'react-router-dom';
import {saveJobDetailsToStore} from '../../actions/jobResultsAction';
import JobHeader from "../Header/JobHeader";

class JobDisplayPage extends Component {
    constructor(props) {
        super(props);
        console.log(props);

        this.state = {
            saveClicked : false,
            redirectToJobApplication : false,
            imageData:""
        }
        //bind
        this.handleSaveClick = this.handleSaveClick.bind(this);
        this.handleApplyJob = this.handleApplyJob.bind(this);
        this.handleEasyApply = this.handleEasyApply.bind(this);
    }

    componentDidMount(){

        if(this.props.loginStateStore){

        
        axios.defaults.withCredentials=true;
        
        /**Get company logo */
        this.getLogo();

        /**To toggle apply and Easy apply */
        this.toggleApplyEasyApply();
        

        console.log('data sent', data);
        if(this.props.jobResultsStateStore.result != null){
            var data = {
                jobData : this.props.jobResultsStateStore.result
            };
            axios.post("http://localhost:3001/analytics/userclicks", data).then(
            response => {
              console.log("job click updated");
              console.log(response.data)
            },
            error => {
              console.log(error);
            }
        );
        }
    }
    }

    getLogo = ()=>{
        console.log('logo', this.props.jobResultsStateStore.result.companyLogo);
        axios.post('http://localhost:3001/download/' + this.props.jobResultsStateStore.result.companyLogo)
            .then((response)=>{
                if(response.status === 200){
                    console.log('resonse logo', response.data );
                    this.setState({
                        imageData : 'data:image/jpg;base64, ' + response.data
                    });
                }
                
            });
    };  

    toggleApplyEasyApply = () =>{
        this.props.jobResultsStateStore.result.applyClassName = 'btn btn-lg ml-3 apply-btn';
        this.props.jobResultsStateStore.result.easyApplyClassName = 'btn btn-lg ml-3 easy-apply-btn';

        if(this.props.jobResultsStateStore.result.easyApply == "Yes"){
            this.props.jobResultsStateStore.result.applyClassName = this.props.jobResultsStateStore.result.applyClassName + ' block-btn';
        }
        else{
            this.props.jobResultsStateStore.result.easyApplyClassName = this.props.jobResultsStateStore.result.easyApplyClassName + ' block-btn';
        }
    }

    handleApplyJob = ()=>{
        //this.saveJobDetailsToStore();
        this.setState({
          redirectToJobApplication: true
        });
      }
      handleEasyApply = ()=>{
        //this.saveJobDetailsToStore();
        this.setState({
          redirectToEasyJobApplication: true
        });
      }

      saveJobDetailsToStore = () =>{
        console.log('Inside saveJobDetailstoStore');
        this.props.saveJobDetailsToStore(this.state.jobDetails);
        this.setState({
            redirectToJobApplication : true
        });
      }

    handleSaveClick = () =>{
        //console.log('Job details',this.state.jobDetails);
        if(this.state.saveClicked === false){
          var data = {
            jobDetails : this.props.jobResultsStateStore.result,
            email : this.props.loginStateStore.email
          };
    
          axios.post('http://localhost:3001/save-job', data)
          .then((response) =>{
            if(response.status === 200){
              this.setState({
                saveClicked: true
              });
            }
          });
        }
        
      }

    render() {
        var redirectVar = null;
        if(!this.props.loginStateStore) {
            
            redirectVar = <Redirect to= "/login"/>
        }
          if(this.state.redirectToJobApplication === true){
            redirectVar = <Redirect to="/jobs/apply-job"/>
          }
          if(this.state.redirectToEasyJobApplication === true){
            redirectVar = <Redirect to="/jobs/easy-apply-job"/>
          }

          console.log('Image data: ',redirectVar );
        return (
            <div>
                {redirectVar}
                <JobHeader/>
                <div className="cover-image-container">
                    <img src="https://wallpapercave.com/wp/0557mer.jpg" alt="cover-img" />
                </div>
                <div className="row ">
                    <div className="col-lg-1"></div>
                    <div className="content-container col-lg-8">
                        <div className="job-head-container border">
                            <div className="pad-left-5-pc mt-5 row">
                                <div className="job-display-img-container col-lg-2 col-md-2 col-sm-2">
                                    <img
                                        className="job-display-logo"
                                        // src="https://media.licdn.com/dms/image/C4D0BAQHcZzoBjmYdvA/company-logo_200_200/0?e=1550102400&v=beta&t=oXB0dGr7pUu2H-c8gPeoMDbl2cVIMSMXInCOZ74fjJc"
                                        src = {this.state.imageData}
                                        alt="company-logo"
                                    />
                                </div>
                                <div className="job-display-title-container-content col-lg-7 col-md-7 col-sm-7">
                              
                                    <div><b>{this.props.jobResultsStateStore.result != null ? this.props.jobResultsStateStore.result.jobTitle:""}</b></div>
                                    <div>{this.props.jobResultsStateStore.result != null ? this.props.jobResultsStateStore.result.location:""}</div>
                                
                                <div className="mt-2"> 
                                    <button className="btn btn-lg save-btn" onClick={this.handleSaveClick}>Save</button>
                                    <button className={this.props.jobResultsStateStore.result != null ? this.props.jobResultsStateStore.result.easyApplyClassName : ""} onClick={this.handleEasyApply}>
                                        <span className="">
                                        <img
                                            className="apply-logo mr-2"
                                            src="http://www.theredbrickroad.com/wp-content/uploads/2017/05/linkedin-logo-copy.png"
                                            alt="logo"
                                        />
                                        </span>
                                        <span><b>Easy apply</b></span>
                                    </button>
                                    <button className={this.props.jobResultsStateStore.result != null ? this.props.jobResultsStateStore.result.applyClassName:""} onClick={this.handleApplyJob}>Apply</button>
                                </div>
                                </div>
                            </div>
                        </div>
                        <div className="job-desc-container mt-3 border">
                            <div className="job-desc-container-content mt-3 ml-4 mb-5">
                                {this.props.jobResultsStateStore.result != null ? this.props.jobResultsStateStore.result.jobDescription:""}
                            </div>  
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

//
const mapStateToProps = state =>({
    jobResultsStateStore : state.jobResultsStateStore,
    loginStateStore : state.Login.result
});

//export default JobDisplayPage;
export default connect(mapStateToProps, {saveJobDetailsToStore})(JobDisplayPage);