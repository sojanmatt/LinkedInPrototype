import React, {Component} from 'react';
import Header from '../Header/Header';
import "../../static/css/JobApplication.css";
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

class JobApplication extends Component{
    constructor(props){
        super(props);
        console.log(props);
        this.state={
            applicationSubmitted : false,
            isApplicationHalfFilled : false,
            isApplicationViewed: true
        };

        //bind
        this.handleChange = this.handleChange.bind(this);
        this.submitApplication = this.submitApplication.bind(this);
    }

    componentDidMount(){
        if(this.props.loginStateStore.isAuthenticated === true){
            this.jobViewed();
        }
        
    }

    componentWillUnmount(){
        console.log('Compononent will unmount');
        if(this.state.isApplicationHalfFilled === true){
            axios.defaults.withCredentials=true;
            var data = {
                jobId: this.props.jobResultsStateStore.result.jobId,
                jobTitle: this.props.jobResultsStateStore.result.jobTitle
            }
            axios.post('http://localhost:3001/log-app-halffilled', data)
                .then((response)=>{
                    if(response.status === 200){
                        console.log('Log Half Filled response', response.data);
                    }
                });
        }
    }

    jobViewed = () => {
        var data = {
            jobId: this.props.jobResultsStateStore.result.jobId,
            jobTitle: this.props.jobResultsStateStore.result.jobTitle
        }
        axios.defaults.withCredentials=true;
        axios.post('http://localhost:3001/log-job-viewed', data)
            .then((response)=>{
                if(response.status === 200){
                    console.log('job view log saved!');
                }
            });
    }

    handleChange = (event) =>{
        const target = event.target;
        const name = target.name;
        const value = target.value;

        if(name == "resume"){

            var resume = target.files[0];
            var data = new FormData();
            data.append('resume', resume);
            console.log('Resume uploaded!');
            axios.defaults.withCredentials=true;
            axios.post('http://localhost:3001/upload_file', data)
                .then((response)=>{
                    if(response.status === 200){
                        console.log('Resume data', resume.name);
                        this.setState({
                            resume : resume.name,
                            isApplicationHalfFilled: true
                        });
                    }
                });
        }
        else if(name == "coverletter"){
            var coverletter = target.files[0];
            var data = new FormData();
            data.append('coverletter', coverletter);
            console.log('coverletter uploaded!');
            axios.defaults.withCredentials=true;
            axios.post('http://localhost:3001/upload_file', data)
                .then((response)=>{
                    if(response.status === 200){
                        console.log('coverletter data', coverletter.name);
                        this.setState({
                            coverletter : coverletter.name,
                            isApplicationHalfFilled: true
                        });
                    }
                });
        }
        else{
            this.setState({
                [name] : value,
                isApplicationHalfFilled: true
            });
        }

        
    }
    
    submitApplication = () =>{

        axios.defaults.withCredentials=true;

        var logData = {
            jobId: this.props.jobResultsStateStore.result.jobId,
            jobTitle: this.props.jobResultsStateStore.result.jobTitle
        }

        axios.post('http://localhost:3001/log-application-submitted', logData)
            .then((response)=>{
                if(response.status === 200){
                    console.log('Log application submitted done!')
                }
            });

    
        var data = {
            applicationData : {
                firstname : this.state.firstname,
                lastname : this.state.lastname,
                email : this.state.email,
                country : this.state.country,
                address : this.state.address,
                postedDate : new Date(),
                city : this.state.city,
                state : this.state.state,
                zipcode : this.state.zipcode,
                source : this.state.source,
                sponsorship : this.state.sponsorship,
                diversity : this.state.diversity,
                disabled: this.state.disabled,
                resume : this.state.resume,
                coverletter : this.state.coverletter
            }, 
            jobId : this.props.jobResultsStateStore.result.jobId,
            jobData : this.props.jobResultsStateStore.result,
            email : this.props.loginStateStore.result.email
            
        }
        
        axios.post('http://localhost:3001/apply-job', data)
            .then((response)=>{
                if(response.status === 200){
                    this.setState({
                        applicationSubmitted: true,
                        isApplicationHalfFilled : false
                    });
                }
            });
        
    }
    
    render(){

        var redirectVar = null;
        if(this.state.applicationSubmitted === true){
            redirectVar  = <Redirect to="/"/>
        }
        if(this.props.loginStateStore.isAuthenticated === false){
            redirectVar = <Redirect to= "/login"/>
        }
        return(
            <div>
                {redirectVar}
                <Header/>
                <div>
                    <div className="container">
                        <div className="form-container mt-5 border">
                            <div className="ml-5 mt-3 form-content">
                                <h3>Apply Job</h3>  
                                <hr/>
                                <div className="form-group">
                                    <input type="text" name="firstname" className="form-control form-control-lg" onChange={this.handleChange} required placeholder="First Name"/>
                                </div>
                                <div className="form-group">
                                    <input type="text" name="lastname" className="form-control form-control-lg" onChange={this.handleChange} required placeholder="Last Name"/>
                                </div>
                                <div className="form-group">
                                    <input type="text" name="email" className="form-control form-control-lg" placeholder="Email" onChange={this.handleChange} required/>
                                </div>
                                <div className="form-group">
                                    <input type="text" name="country" className="form-control form-control-lg" placeholder="Country" onChange={this.handleChange} required/>
                                </div>
                                <div className="form-group">
                                    <input type="text" name="address" className="form-control form-control-lg" placeholder="Address" onChange={this.handleChange} required/>
                                </div>
                                <div className="form-group">
                                    <input type="text" name="city" className="form-control form-control-lg" placeholder="City" onChange={this.handleChange} required/>
                                </div>
                                <div className="form-group">
                                    <input type="text" name="state" className="form-control form-control-lg" placeholder="State" onChange={this.handleChange} required/>
                                </div>
                                <div className="form-group">
                                    <input type="text" name="zipcode" className="form-control form-control-lg" placeholder="Zip Code" onChange={this.handleChange} required/>
                                </div>
                                <div className="form-group">
                                    <div>How did you hear about us?</div>
                                    <input type="text" name="source" className="mt-2 form-control form-control-lg" placeholder="Source" onChange={this.handleChange}/>
                                </div>
                               
                                <div className="form-group">
                                <div> Will you now, or in the future, require sponsorship for employment visa status (e.g. H-1B visa status)? </div>
                                    <input type="text" name="sponsorship" className="mt-2 form-control form-control-lg" placeholder="" onChange={this.handleChange}/>
                                </div>
                                <div className="form-group">
                                    <div>Provide your diversity information</div>
                                    <input type="text" name="diversity" className="mt-2 form-control form-control-lg" placeholder="Diversity" onChange={this.handleChange}/>
                                </div>
                                <div className="form-group">
                                    <div>Are you physically challenged?</div>
                                    <input type="text" name="disabled" className="mt-2 form-control form-control-lg" placeholder="" onChange={this.handleChange}/>
                                </div>
                                
                              <div className="form-group">
                                    <label htmlFor="resume">Resume</label><br />
                                        <input type="file" name="resume" id="resume" className="btn btn-lg resume-upload-btn" onChange={this.handleChange} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="coverletter">Cover Letter</label><br />
                                        <input type="file" name="coverletter" id="coverletter" className="btn btn-lg resume-upload-btn" onChange={this.handleChange} />
                                </div>
                                <div className="form-group">
                                    <button name="apply" className="col-3 btn btn-lg form-control form-control-md apply-job-btn" onClick={this.submitApplication}>Submit</button>
                                </div>
                            </div>
                        </div>                            
                    </div>    
                </div>
            </div>
        )
    }
}
//mapstatetoProps
const mapStateToProps  = state =>({
    jobResultsStateStore : state.jobResultsStateStore,
    loginStateStore : state.Login
  });

export default connect(mapStateToProps)(JobApplication);