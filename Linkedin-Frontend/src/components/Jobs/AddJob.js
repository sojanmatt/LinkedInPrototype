import React, {Component} from 'react';
import Header from '../Header/Header';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {Redirect} from 'react-router';
import { connect } from "react-redux";

class AddJobs extends Component{
    constructor(){
        super();
        this.state = {  
            companyName: "",
            jobTitle: "",
            industry: "",
            employmentType: "Full-time",
            easyApply: "Yes",
            location: "",
            seniorityLevel: "Full-time",
            jobDescription: "",
            companyPic: '',
            selectedFile: '',
            images: '',
            postedDate: new Date(),
            redirectState: false
        }
        this.companyNameChangeHandler = this.companyNameChangeHandler.bind(this);
        this.jobTitleChangeHandler = this.jobTitleChangeHandler.bind(this);
        this.industryChangeHandler = this.industryChangeHandler.bind(this);
        this.employmentTypeChangeHandler = this.employmentTypeChangeHandler.bind(this);
        this.easyApplyChangeHandler = this.easyApplyChangeHandler.bind(this);
        this.locationChangeHandler = this.locationChangeHandler.bind(this);
        this.seniorityLevelChangeHandler = this.seniorityLevelChangeHandler.bind(this);
        this.jobDescriptionChangeHandler = this.jobDescriptionChangeHandler.bind(this);
        this.submitJobDetails = this.submitJobDetails.bind(this);
    }
    companyNameChangeHandler = (e) => { this.setState({ companyName : e.target.value }) }
    jobTitleChangeHandler = (e) => { this.setState({ jobTitle : e.target.value }) }
    industryChangeHandler = (e) => { this.setState({ industry : e.target.value }) }
    employmentTypeChangeHandler = (e) => { this.setState({ employmentType : e.target.value })}
    easyApplyChangeHandler = (e) => { this.setState({ easyApply : e.target.value })}
    locationChangeHandler = (e) => { this.setState({ location : e.target.value }) }
    seniorityLevelChangeHandler = (e) => { this.setState({ seniorityLevel : e.target.value }) }
    jobDescriptionChangeHandler = (e) => { this.setState({ jobDescription : e.target.value }) }

    onChange = (e) => {
        if(e.target.name == 'selectedFile'){
            console.log(e.target.files);
              this.setState({
            selectedFile: e.target.files[0]
          })
        }else{
          this.setState({ [e.target.name]: e.target.value });
        }
        console.log("selectedFile file",this.state.selectedFile);
    }

    async submitJobDetails(event) {
        event.preventDefault();
        const { selectedFile } = this.state;
        let formData = new FormData();
        formData.append('selectedFile', selectedFile);
       
        console.log("image file",formData);
        await axios.post('http://localhost:3001/upload_file', formData)
        .then(async (result) => {
          // access results...
        });
        console.log(this.state.selectedFile.name);
        var img =  this.state.selectedFile.name
       
        console.log("easy apply",this.state.easyApply);
        const data = {
            username: this.props.loginStateStore.email,
            companyName: this.state.companyName,
            jobTitle: this.state.jobTitle,
            industry: this.state.industry,
            employmentType: this.state.employmentType,
            location: this.state.location,
            easyApply: this.state.easyApply,
            seniorityLevel: this.state.seniorityLevel,
            jobDescription: this.state.jobDescription,
            postedDate: this.state.postedDate,
            images: img
        }
        axios.defaults.withCredentials = true;   
        axios.
        post("http://localhost:3001/submitJobDetails", data)
            .then(async (response) => {
                if(response.status === 200){
                    this.setState({
                        redirectState: true
                    })
                }else{
                }
            });
    }

    render(){
        var redirectVar = null;
        console.log(this.props.loginStateStore);
        if(!this.props.loginStateStore) {
            redirectVar = <Redirect to= "/login"/>
        }
        if(this.state.redirectState) {
            redirectVar = <Redirect to= "/home"/>
        }
        const enabled = this.state.companyName.length > 0 && this.state.industry.length > 0 && this.state.employmentType.length > 0 &&
        this.state.jobTitle.length >0 && this.state.easyApply.length && this.state.location.length > 0 && this.state.seniorityLevel.length > 0 
        && this.state.jobDescription.length > 0 && this.state.selectedFile!='';
        return(
            <div>
                {redirectVar}
            <Header/>
            <div className = "post-job-container">
            <div class="post_job_columns col-lg-7 border post-job-border">
            <p className="addJob_title"> What job do you want to post?</p>
            <div class="form-group row">

            <span class="jobPosting_boxes">
            <p>Company</p>
            <div>
            <input onChange = {this.companyNameChangeHandler} type="text" className="form-control inputfield" name="companyName" placeholder="Company Name"/>
            </div>
            </span>
            
            <span class="jobPosting_boxes">
            <p>Job Title</p>
            <div>
            <input onChange = {this.jobTitleChangeHandler} type="text" className="form-control inputfield" name="jobTitle" placeholder="Job Title"/>
            </div>
            </span>

            <span class="jobPosting_boxes">
            <p>Location</p>
            <div>
            <input onChange = {this.locationChangeHandler} type="text" className="form-control inputfield" name="location" placeholder="location"/>
            </div>
            </span>
            </div>

            <div class="form-group row">
            <span class="jobPosting_boxes">
            <p>Employment Type</p>
            <div>
            <select onChange = {this.employmentTypeChangeHandler} className="selectBox_postJob" name="employmentType">
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Temporary">Temporary</option>
                <option value="Volunteering">Volunteering</option>
                <option value="Internship">Internship</option>
            </select>

            {/* <input onChange = {this.employmentTypeChangeHandler} type="text" className="form-control inputfield" name="employmentType" placeholder="Employment Type"/> */}
            </div>
            </span>

            <span class="jobPosting_boxes">
            <p>Easy Apply</p>
            <select onChange = {this.easyApplyChangeHandler} className="selectBox_postJob" name="easyApply">
                <option value="Yes">Yes</option>
                <option value="No">No</option>
            </select>
            </span>

            </div>

            <div class="form-group row">

            <span class="jobPosting_boxes">
            <p>Company Industry</p>
            <div>
            <input onChange = {this.industryChangeHandler} type="text" className="form-control inputfield form_control_home_location" name="industry" placeholder="Industry"/>
            </div>
            </span>
            
            <span class="jobPosting_boxes">
            <p>Seniority Level</p>
            <div>
            <select onChange = {this.seniorityLevelChangeHandler} className="selectBox_postJob" name="seniorityLevel">
                <option value="Internship">Internship</option>
                <option value="Entry-level">Entry-level</option>
                <option value="Mid-Senior level">Mid-Senior level</option>
                <option value="Director">Director</option>
                <option value="Associate">Associate</option>
                <option value="Not Applicable">Not Applicable</option>
            </select>
            {/* <input onChange = {this.seniorityLevelChangeHandler} type="text" className="form-control inputfield" name="seniorityLevel" placeholder="Seniority Level"/> */}
            </div>
            </span>
            </div>

            <div class="">
           <span class="jobPosting_boxes">
            <p>Job Description</p>
            <div>
            <input onChange = {this.jobDescriptionChangeHandler} type="text" className="form-control inputfield jobPostingDescriptionInbutBox" name="jobDescription" placeholder="Job Description"/>
            </div>
            </span>
            </div>

             <div class="form-group row">
            <span class="jobPosting_boxes">
            <p ca>Company Logo</p>
            <div class="company_pic">
            <input type="file" name="selectedFile" onChange={this.onChange} multiple/>
            </div>
            </span>
            </div>

            <button disabled={!enabled} className="btn btn-primary" onClick = {this.submitJobDetails}>Submit</button>
            </div>

         <div class="post_job_columns col-lg-3 border post-job-border">
            <p>Show your job to the right candidates</p>
            <p>Include more details such as relevant job functions, industries, and seniority level to help us advertise your job post to qualified candidates and recommend matches for you to reach out to.</p>
            </div>

            </div>
        </div>
        );
    }
}

// export default AddJobs;
function mapStateToProps(state) {
    return { loginStateStore : state.Login.result };
  }
export default connect(mapStateToProps, {})(AddJobs);