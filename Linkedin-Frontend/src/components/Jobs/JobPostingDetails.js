import React, {Component} from 'react';
import Header from '../Header/Header';
import { Link } from "react-router-dom";
import axios from "axios";
import {Redirect} from 'react-router';
import JobHeader from "../Header/JobHeader";
import {postedJobs} from '../../actions/jobPostingDetailsAction';
import { connect } from "react-redux";
import Pagination from "./pagination";
import { paginate } from "../../utils/paginate";

class JobPostingDetails extends Component{
    constructor(props){
        super(props);
        console.log(props);
        this.state = {  
        postedJobs: [],
        redirectToJobEditPage: false,
        search: '',
        currentPage: 1,
        pageSize: 3
        }
        this.handleApplyClick = this.handleApplyClick.bind(this);
    }
    handlePageChange = page => {
        this.setState({ currentPage : page });
    }

    // handleApplyClick = (e) =>{
    //     const target = e.target;
    //     const id = target.id;

    //     // this.props.saveJobDetailsToStore(this.props.jobsLandingPageStateStore.result[id]);
    //     // this.setState({
    //     //     redirectToApplicationPage : true
    //     // });
    // }

    async componentDidMount(){
        if(this.props.loginStateStore) {
        var data = {
            username: this.props.loginStateStore.email
        }
    
        axios.post('http://localhost:3001/JobPostingHistory',data)
            .then(async (response) => {
                console.log(response);
                var arr = response.data.value;
                console.log(arr);
                this.setState({
                    postedJobs : this.state.postedJobs.concat(arr) 
                });   
        });
        }
    }

    handleApplyClick = job => {
        //  const target = e.target;
        //console.log("current page", this.state.currentPage);
        // const id = ((this.state.currentPage-1)*this.state.pageSize)+parseInt(target.id);
        console.log("true");
        //   console.log(id);
        //   console.log(this.state.postedJobs[job]);
        this.props.postedJobs(job);
        this.setState({
          redirectToJobEditPage: true
        });
      };

    updateSearch(event) {
        this.setState({search: event.target.value.substr(0,20)});
    }
    
    render(){
        var redirectVar = null;

        if(this.state.redirectToJobEditPage === true){
            console.log("true")
            redirectVar  = <Redirect to="/jobs/edit-job-post"/>
        }
        if(!this.props.loginStateStore) {
            redirectVar = <Redirect to= "/recruiter-signup"/>
        }

        const {length : count} = this.state.postedJobs;
        const { pageSize, currentPage } = this.state;

        let filteredProperties = this.state.postedJobs
        .filter(
            (job) => {
                console.log(this.state.search);
               return job.jobTitle.indexOf(this.state.search) !== -1;
            //    && properties.availableStartingDate>=this.state.fromDate;
            });

            const movies = paginate(filteredProperties, currentPage, pageSize)

        if(this.state.postedJobs.length>0) {
        console.log(this.state.postedJobs);
        }
        var savedJobsContent = movies.map((job, index)=>{
            return(
                <div key={index}>
                    <div className="job-title"><b><Link to="#" id={index} onClick={this.handleClick}>{job.jobTitle}</Link></b></div>
                    <button className="btn btn-lg save-btn flt-right" id={index} onClick={() => this.handleApplyClick(job)}>Edit</button>
                    <div className="">{job.companyName}</div>
                    <div className="">{job.employmentType}</div>
                    <hr/>
                </div>
            )
        });
      

        return(
            <div className="saved-jobs-main-container">
                <Header />
                {redirectVar}
                <div>
                <div className="form-group form_group_home">
                <input type = "text" value = {this.state.search} onChange={this.updateSearch.bind(this)} placeholder = "Filter by Job Title" className="form-control form-control-lg form_control_home_location col-xs-3"/>
                </div>
                <div className="row mt-5">
                    <div className="col-2"></div>
                    <div className="col-8 border content-container mt-3">
                        <div><h3>Posted Jobs</h3></div>
                        <hr/>
                        <div>
                            {savedJobsContent}
                            <div>
                        <Pagination itemsCount={count} pageSize={pageSize} 
                        currentPage = {this.state.currentPage}
                        onPageChange={this.handlePageChange} /> 
                        </div>
                        </div>                    
                    </div>
                </div>

                </div>
                
            </div>
        );
    }
}


function mapStateToProps(state) {
    return { loginStateStore : state.Login.result }
    
};

//export default SavedJobs;
export default connect(mapStateToProps, {postedJobs})(JobPostingDetails);
// export default JobPostingDetails;