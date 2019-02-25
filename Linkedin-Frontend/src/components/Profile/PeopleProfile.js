import React, {Component} from 'react';
import '../../static/css/PeopleProfile.css';
import Header from '../Header/Header';
import{Link} from 'react-router-dom';
import axios from 'axios';
import {connect} from 'react-redux';
import {saveJobDetailsToStore} from '../../actions/jobResultsAction';
import {Redirect} from 'react-router-dom';


class PeopleProfile extends Component{
    
    constructor(props){
        super(props);
        console.log(props);
        this.state = {
            profile: [],
            message : [],
            senderEmailId : '',
            receiverEmailId : '',
            FName : '',
            isConnection : false,
            profileImage: "data:image/png;base64,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",
            connectionSent : false
          };
        //bind
        this.addConnection = this.addConnection.bind(this);
        this.logProfileView = this.logProfileView.bind(this);
        this.sendMessageHandler = this.sendMessageHandler.bind(this);
        this.inputHandler = this.inputHandler.bind(this);
    }

    componentWillReceiveProps(nextprops){
        console.log(nextprops)
    }

        
    async componentDidMount(){

       if(this.props.loginStateStore.isAuthenticated == "true"){
            this.isConnection();
        this.logProfileView();
       // this.loadProfileImage();
        axios.defaults.withCredentials=true;
        console.log("profile",this.props.profileResultsStateStore.result.user.experience.length);
        var skillsresult = (this.props.profileResultsStateStore.result.user.skills).split(',');
        console.log("skills:",skillsresult );
        console.log("sender" + this.props.loginStateStore.result.email)
        this.setState({
            profile :  this.props.profileResultsStateStore.result.user,
            senderEmailId : this.props.loginStateStore.result.email 
        });
        }
        
        
    }

    isConnection = () => {
        var connectionsArr = this.props.profileResultsStateStore.result.connections;
        if(connectionsArr.length > 0){
            for(var i=0;i<connectionsArr.length;i++){
                console.log('IsConnection!');
                if(connectionsArr[i].email == this.props.loginStateStore.result.email){
                    console.log('Is a Connection');
                    this.setState({
                        isConnection: true
                    });
                    break;
                }
                
            }
        }
        else{
            this.setState({
                isConnection: false
            });
        }
        

    }

    loadProfileImage = ()=>{
        console.log("profileimage:",this.props.profileResultsStateStore.result.user.profileimage)
        axios.post('http://localhost:3001/download/' +  this.props.profileResultsStateStore.result.user.profileimage).then(response =>{
            console.log("inside download file");
         this.setState({   
             profileImage : 'data:image/jpg;base64, ' + response.data
        } 
         )}   
        )
    }
    
    logProfileView = ()=>{
        axios.defaults.withCredentials=true;
        var data = {
            profileEmail : this.props.loginStateStore.result.email,
            viewTime : new Date()
        }

        axios.post('http://localhost:3001/log-profile-view', data)
            .then((response)=>{
                if(response.status === 200){
                    console.log('profile view response', response.data);
                }
            });

    }

    addConnection = ()=>{
        
        var profileData = {
            email : this.props.profileResultsStateStore.result.user.email,
            connectProfileData : {}
        };
        axios.defaults.withCredentials=true;
        
        var data = {
            email: this.props.loginStateStore.result.email
        }
        console.log('data req', data);
        axios.post('http://localhost:3001/get-profile-data', data)
            .then((response)=>{
                if(response.status === 200){
                    console.log('response profile', response.data);
                
                    profileData.connectProfileData = response.data.user;
                    console.log('profile data: ', profileData);
                    axios.post('http://localhost:3001/send-connection-request', profileData)
                    .then((response)=>{
                        console.log('Send Connection res', response.data);
                        this.setState({
                            connectionSent : true
                        });
                    });
                }
            });    
    }

    inputHandler = (e) => {
        this.setState({
            message : e.target.value
        })
    }

    sendMessageHandler = ()=>{
        console.log("Sender Email ID " + this.state.senderEmailId)
        var values = {
            messageThread : this.props.loginStateStore.result.FName + " : " + this.state.message,
            senderEmailId :  this.props.loginStateStore.result.email,
            receiverEmailId : this.props.profileResultsStateStore.result.user.email
        }
        console.log(JSON.stringify(values))
        axios.post('http://localhost:3001/sendmessage', values)
            .then((response)=>{
                if(response.status === 200){
                    console.log("Message sent")
                }
            });  
        
    }

    render(){

        var redirectVar = null;
        if(this.props.loginStateStore.isAuthenticated === false){
            redirectVar  = <Redirect to="/login"/>
        }
        else{
            var experience = null;
        if(this.props.profileResultsStateStore.result != null){
            if(this.props.profileResultsStateStore.result.user.experience.length > 0){
                experience = this.props.profileResultsStateStore.result.user.experience.map((exp, index)=>{
                    return (
                        <div key={index}>
                         <div className="exp-content-container ml-4 row">
                                    <div className="col-1">
                                        <img className="profile-company-img-container" src="https://static.pulse.ng/img/incoming/origs8609049/1036368589-w644-h960/work-experience.jpg" alt="profile-company-img"/>
                                    </div>
                                    <div className="col-6 ml-4">
                                        <div>{exp.designation}</div>
                                        <div>{exp.companyname}</div>
                                        <div>{exp.responsibility}</div>
                                        <div>{exp.location}</div>
                                    </div>
                                </div>
                                <hr/>
                                </div>
                                )
                            });
                        } 
        }
        

                    var education = null;
        if(this.props.profileResultsStateStore.result != null){
            if(this.props.profileResultsStateStore.result.user.education.length > 0){
                education = this.props.profileResultsStateStore.result.user.education.map((edu, index)=>{
                    return (
                        <div key={index}>
                         <div className="exp-content-container ml-4 row">
                                    <div className="col-1">
                                        <img className="profile-company-img-container" src="https://st2.depositphotos.com/2586633/10219/v/950/depositphotos_102194092-stock-illustration-books-vector-illustrator-stack-of.jpg" alt="profile-company-img"/>
                                    </div>
                                    <div className="col-6 ml-4">
                                        <div>{edu.school}</div>
                                        <div>{edu.degree}</div>
                                        <div>{edu.fromyear} - {edu.toyear}</div>
                                    </div>
                                </div>
                                <hr/>
                                </div>
                                )
                            });
                        } 
                        var skillsresult = (this.props.profileResultsStateStore.result.user.skills).split(',');
                        var skillsresult1 = null;
            console.log(skillsresult);
            if(skillsresult.length > 0){
                 skillsresult1 = skillsresult.map((skill, index)=>{
                    return (
                        <div key={index}>
            <div className="skills-content-container ml-4">
            <div className="skill-name">{skill}</div>
        </div>
        <hr/>
        </div>
              )
            });
        } 
        }
        
        
        
            

        var connectButton = null;
        var messageButton = null;
        if(this.state.isConnection === false){
            connectButton = <div className="mt-2"><button className="btn btn-md profile-btn" onClick={this.addConnection}>Connect</button></div>
        }
        if(this.state.isConnection === true){
            messageButton =  <div className="mt-2">
            <button type="button" className="btn btn-md profile-btn" data-toggle="modal" data-target="#exampleModal">
            Message
            </button>

            <div className="modal fade" id="exampleModal" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Send message </h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                <form>
                    <div className="form-group">
                        <label htmlFor="message-text" className="col-form-label">Message:</label>
                        <textarea className="form-control" id="message-text" onChange = {this.inputHandler}></textarea>
                    </div>
                    </form>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" className="btn btn-primary" onClick = {this.sendMessageHandler}>Send</button>
                </div>
                </div>
            </div>
            </div>
            </div>
        }
        }
        var connectionAlert = null;
         if(this.state.connectionSent === true){
            connectionAlert = <div class="alert alert-success mt-2" role="alert">
                                <strong>Connection Sent!</strong> 
                            </div>
         }
        

        return(
            <div>
                 
                <Header />
                {redirectVar}
                <div className="row people-profile-container">
                    <div className="col-lg-1"></div>
                    <div className="content-container col-lg-8 mt-5">
                        <div className="intro-container border">
                            <div className="cover-image-container">
                                <img src="https://wallpapercave.com/wp/0557mer.jpg" alt="cover-img" />
                            </div>
                            <div className="profile-img-container ml-4">
                                <img className="profile-img" src={this.state.profile.profileimage} alt="profile-img"/>
                            </div>
                            <div className="pull-down-div ml-4 row">
                                <div className="col-7">
                                    <div className="profile-name">{this.state.profile.Fname} {this.state.profile.Lname}</div>
                                    <div className="profile-summary">{this.state.profile.aboutMe}</div>
                                    <div>{this.state.profile.city}, {this.state.profile.state}</div>
                                    {/* <div className="mt-2"><button className="btn btn-md profile-btn" onClick={this.addConnection}>Connect</button></div> */}
                                    {/* <div className="mt-2"><button className="btn btn-md profile-btn" onClick={this.sendMessage}>Message</button></div> */}
                                    {connectButton}
                                    {messageButton}
                                    {connectionAlert}
                                </div>
                                <div className="col-5 flt-right">
                                    <div className="p-1">{this.state.profile.Company}</div>
                                    <div className="p-1">See contact info</div>
                                    <div className="p-1"><i className="fas fa-user-friends pr-2"></i>See Connections</div>
                                </div>
                            </div> 
                            <hr className="ml-4 mr-4"/>   
                            <div className="mb-5 ml-4 mr-4">
                            I am pursuing Masters in Software Engineering specializing in Enterprise Software Technologies at San Jose State University. 

I am looking for opportunities in the field of Software Development. 

I worked as a Software Analyst at Aspire Systems. Strong engineering professional with a Bachelor of Technology (B.Tech.) focused in Computer Science from SASTRA University. 

I am very passionate about software engineering and eager to work with new technologies and in a challenging environment. I have over 18 months of experience as a Software Developer with a demonstrated history of working in the information technology and services industry. 

Skills:

PROGRAMMING: JAVA, C# .NET, Node JS (Express), React JS, Redux, HTML5, CSS, jQuery
TECHNOLOGIES: Apache Kafka, Mocha, JUnit, Episerver CMS, Azure, AWS
DATABASE: SQL Server, MySQL, MongoDB
TOOLS: JMeter, JIRA, Confluence, Git, IIS                         
                            </div>
                        </div>
                        <div className="exp-container mt-5 border pb-3">
                            <h4 className="ml-4 mt-4">Experience</h4>
                            <hr/>
                           {experience}
                        </div>
                        <div className="edu-container mt-5 border pb-4">
                            <h4 className="ml-4 mt-4">Education</h4>
                            <hr/>
                            {education}
                        </div>
                        <div className="profile-skills-container mt-5 border pb-4">
                            <h4 className="ml-4 mt-4">Skills</h4>
                            <hr/>
                           {skillsresult1}
                        </div>
                    </div>
                    
                </div>

            </div>
        )
    }
}

const mapStateToProps = state =>({
    profileResultsStateStore : state.profileResultsStateStore,
    loginStateStore : state.Login
});

//export default JobDisplayPage;
export default connect(mapStateToProps, {})(PeopleProfile);
