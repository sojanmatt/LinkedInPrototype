import React, {Component} from 'react';
import Header from '../Header/Header';
import axios from 'axios';
import {Link} from 'react-router-dom';
import { connect } from "react-redux";
import {viewApplicantResume} from '../../actions/viewApplicantResumeAction';
import {Redirect} from 'react-router';

class EditJobPost extends Component{
    constructor(props){
        super(props);
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
        this.handleClick = this.handleClick.bind(this);
    }
//     componentWillReceiveProps(){
//             console.log("jobhistoryprops", this.props.JobHistory);
//         this.setState({
//             companyName: this.props.JobHistory.jobId,
//             jobTitle: this.props.JobHistory.jobTitle,
//             industry: this.props.JobHistory.industry,
//             employmentType: this.props.JobHistory.employmentType,
//             location: this.props.JobHistory.location,
//             seniorityLevel: this.props.JobHistory.seniorityLevel,
//             jobDescription: this.props.JobHistory.jobTitle.jobDescription,
//             companyPic: this.props.JobHistory.companyPic
//         })
// }

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
    }

    componentDidMount() {
        if(this.props.JobHistory.jobId.length>0) {
            this.setState({
            companyName: this.props.JobHistory.companyName,
            jobTitle: this.props.JobHistory.jobTitle,
            industry: this.props.JobHistory.industry,
            employmentType: this.props.JobHistory.employmentType,
            location: this.props.JobHistory.location,
            seniorityLevel: this.props.JobHistory.seniorityLevel,
            jobDescription: this.props.JobHistory.jobDescription,
            companyPic: this.props.JobHistory.companyPic
        })
        }
    }

    async submitJobDetails(event) {
        event.preventDefault();
        const { selectedFile } = this.state;
        let formData = new FormData();
        formData.append('selectedFile', selectedFile);
        console.log("selectedFile file",this.state.selectedFile);
       
        console.log("image file",formData);
        await axios.post('http://localhost:3001/upload_file', formData)
        .then(async (result) => {
          // access results...
        });
        var img =  this.state.selectedFile.name
       console.log("jobid",this.props.JobHistory.jobId);
       console.log("easy apply",this.state.easyApply);
        const data = {
            username: this.props.loginStateStore.email,
            jobId: this.props.JobHistory.jobId,
            companyName: this.state.companyName,
            jobTitle: this.state.jobTitle,
            industry: this.state.industry,
            employmentType: this.state.employmentType,
            easyApply: this.state.easyApply,
            location: this.state.location,
            seniorityLevel: this.state.seniorityLevel,
            jobDescription: this.state.jobDescription,
            postedDate: this.state.postedDate,
            images: img
        }
        axios.defaults.withCredentials = true;   
        axios.
        post("http://localhost:3001/submitEditedJobDetails", data)
            .then(async (response) => {
                if(response.status === 200){
                    this.setState({
                        redirectState: true
                    })
                }else{
                }
            });
    }

    handleClick = (e) =>{
        const target = e.target;
        const id = target.id;
        console.log("true");
        console.log(this.props.JobHistory.applicantData[id]);
        this.props.viewApplicantResume(this.props.JobHistory.applicantData[id]);
        // this.props.viewAppliedApplicantResume(this.props.JobHistory.applicantData[id]);
        // this.setState({
        //     redirectToJobEditPage : true
        // });
    }

    render(){
        var redirectVar = null;

        if(!this.props.loginStateStore) {
            redirectVar = <Redirect to= "/login"/>
        }
        const enabled = this.state.companyName.length > 0 && this.state.industry.length > 0 && this.state.employmentType.length > 0 &&
        this.state.jobTitle.length >0 && this.state.easyApply.length && this.state.location.length > 0 && this.state.seniorityLevel.length > 0 
        && this.state.jobDescription.length > 0 && this.state.selectedFile!='';
        if(this.state.redirectState) {
            redirectVar = <Redirect to= "/home"/>
        }
        
        else {
        console.log("jobid",this.props.JobHistory.jobId);
        var applicantArray = null;
        var applicantArray = this.props.JobHistory.applicantData.map((applicantDetail, index)=>{
            console.log("applicant state state state",applicantDetail.state);
            return(
                <div key={index}>
                    <div className="flt-right"><b><Link to="/viewApplicantResumePDF" id={index} onClick={this.handleClick}>View Resume</Link></b></div>
                    {/* <div className="job-title"><b><Link to="#" id={index} onClick={this.handleClick}>{job.jobTitle}</Link></b></div> */}
                    {/* <button className="btn btn-lg save-btn flt-right" id={index} onClick={this.handleApplyClick}>Edit</button> */}
                    <div className="">{applicantDetail.firstname}</div>
                    <div className="">{applicantDetail.email}</div>
                    <div className="">{applicantDetail.country}</div>
                    <hr/>
                </div>
            )
        });
    }

        return(
            <div>
                {redirectVar}
            <Header/>
            <div className = "post-job-container">
            <div class="post_job_columns col-lg-7 border post-job-border">
            <p className="addJob_title"> What job do you want to post?</p>
            <div className="form-group row">

            <span className="jobPosting_boxes">
            <p>Company</p>
            <div>
            <input onChange = {this.companyNameChangeHandler} value={this.state.companyName} required type="text" className="form-control inputfield" name="companyName" placeholder="Company Name"/>
            </div>
            </span>
            
            <span className="jobPosting_boxes">
            <p>Job Title</p>
            <div>
            <input onChange = {this.jobTitleChangeHandler} value={this.state.jobTitle} required type="text" className="form-control inputfield" name="jobTitle" placeholder="Job Title"/>
            </div>
            </span>

            <span className="jobPosting_boxes">
            <p>Location</p>
            <div>
            <input onChange = {this.locationChangeHandler} value={this.state.location} required type="text" className="form-control inputfield" name="location" placeholder="location"/>
            </div>
            </span>
            </div>

            <div className="form-group row">
            <span className="jobPosting_boxes">
            <p>Employment Type</p>
            <div>
            <select onChange = {this.employmentTypeChangeHandler} value={this.state.employmentType} required className="selectBox_postJob" name="employmentType">
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

            <div className="form-group row">

            <span className="jobPosting_boxes">
            <p>Company Industry</p>
            <div>
            <input onChange = {this.industryChangeHandler} value={this.state.industry} type="text" required className="form-control inputfield form_control_home_location" name="industry" placeholder="Industry"/>
            </div>
            </span>
            
            <span className="jobPosting_boxes">
            <p>Seniority Level</p>
            <div>
            <select onChange = {this.seniorityLevelChangeHandler} value={this.state.seniorityLevel} required className="selectBox_postJob" name="seniorityLevel">
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

            <div className="">
           <span className="jobPosting_boxes">
            <p>Job Description</p>
            <div>
            <input onChange = {this.jobDescriptionChangeHandler} value={this.state.jobDescription} required type="text" className="form-control inputfield jobPostingDescriptionInbutBox" name="jobDescription" placeholder="Job Description"/>
            </div>
            </span>
            </div>

             <div className="form-group row">
            <span className="jobPosting_boxes">
            <p>Company Logo</p>
            <div className="company_pic">
            <input type="file" name="selectedFile" onChange={this.onChange} required multiple/>
            </div>
            </span>
            </div>

            <button disabled={!enabled} className="btn btn-primary" onClick = {this.submitJobDetails}>Submit</button>
            </div>
            <div className="post_job_columns col-lg-3 border post-job-border">
            <p>Show your job to the right candidates</p>
            <p>Include more details such as relevant job functions, industries, and seniority level to help us advertise your job post to qualified candidates and recommend matches for you to reach out to.</p>
            </div>
            <br/>

            
            <div class="post_job_columns col-lg-7 border post-job-border">
            {/* <p className="addJob_title"></p> */}
            <div className="row mt-5">
                    <div className="col-2"></div>
                    <div className="col-8 border content-container mt-3">
                        <div><h3> Applicant Details</h3></div>
                        <hr/>
                        <div>
                            {applicantArray}
                        </div>                    
                    </div>
                </div>
                

            </div>

            </div>
        </div>
        );
    }
}

// function mapStateToProps(state) {
//     console.log(state.JobPostingHistory.result);
//     JobHistory : state
// };

// //export default SavedJobs;
// export default connect(mapStateToProps, {})(EditJobPost);
// // export default EditJobPost;

const mapStateToProps = state =>({
    JobHistory : state.JobPostingHistory.result,
    loginStateStore : state.Login.result
});

//export default JobDisplayPage;
export default connect(mapStateToProps, {viewApplicantResume})(EditJobPost);