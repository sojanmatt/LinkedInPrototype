import React, {Component} from 'react';
import {connect} from 'react-redux';
import Header from '../Header/Header';
import {Link} from 'react-router-dom';
import "../../static/css/SavedJobs.css";
import {saveJobDetailsToStore} from '../../actions/jobResultsAction';
import {Redirect} from 'react-router-dom';

class SavedJobs extends Component{

    constructor(props){
        super(props);
        console.log('Props', props);

        this.state = {
            redirectToDisplayPage : false,
            redirectToApplicationPage : false
        }

        //bind
        this.handleClick = this.handleClick.bind(this);
        this.handleApplyClick = this.handleApplyClick.bind(this);
    }

    handleClick = (e) =>{
        const target = e.target;
        const id = target.id;

        this.props.saveJobDetailsToStore(this.props.jobsLandingPageStateStore.result[id]);
        this.setState({
            redirectToDisplayPage : true
        });
    }

    handleApplyClick = (e) =>{
        const target = e.target;
        const id = target.id;

        this.props.saveJobDetailsToStore(this.props.jobsLandingPageStateStore.result[id]);
        this.setState({
            redirectToApplicationPage : true
        });
    }

    render(){

        var redirectVar = null;

        if(this.props.loginStateStore.isAuthenticated === false){
            redirectVar  = <Redirect to="/login"/>
        }

        if(this.state.redirectToDisplayPage === true){
            redirectVar  = <Redirect to="/jobs/display"/>
        }

        if(this.state.redirectToApplicationPage === true){
            redirectVar  = <Redirect to="/jobs/apply-job"/>
        }
        if(this.props.jobsLandingPageStateStore.result){
            var savedJobsContent = this.props.jobsLandingPageStateStore.result.map((job, index)=>{
                return(
                    <div key={index}>
                        <div className="job-title"><b><Link to="#" id={index} onClick={this.handleClick}>{job.jobTitle}</Link></b></div>
                        <button className="btn btn-lg save-btn flt-right" id={index} onClick={this.handleApplyClick}>Apply</button>
                        <div className="">{job.companyName}</div>
                        <div className="">{job.location}</div>
                        <hr/>
                    </div>
                )
            });
        }
        

        return(
            <div className="saved-jobs-main-container">
                <Header />
                {redirectVar}
                <div>
                <div className="row mt-5">
                    <div className="col-2"></div>
                    <div className="col-8 border content-container mt-3">
                        <div><h3>Saved Jobs</h3></div>
                        <hr/>
                        <div>
                            {savedJobsContent}
                        </div>                    
                    </div>
                </div>

                </div>
                
            </div>
        )
    }
}

//mapStateToProps
const mapStateToProps = state =>({
    jobsLandingPageStateStore : state.jobsLandingPageStateStore,
    loginStateStore :state.Login
});

//export default SavedJobs;
export default connect(mapStateToProps, {saveJobDetailsToStore})(SavedJobs);