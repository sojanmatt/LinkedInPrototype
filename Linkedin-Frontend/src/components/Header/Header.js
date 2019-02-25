import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {saveSearchPeopleFieldToStore} from '../../actions/peopleSearchAction';
import profilePic from '../pp.jpg';
import JobHeader from "../Header/JobHeader";
//import {Redirect} from 'react-router-dom';

class Header extends Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            query: "",
            redirectToPeopleResultsPage: false,
        }
      /*   this.handleLogout = this.handleLogout.bind(this);
        this.searchResultsHandler = this.searchResultsHandler.bind(this);
        this.queryChangeHandler = this.queryChangeHandler.bind(this); */
    }
    //handle logout to destroy the cookie
/*     handleLogout = () => {
        window.location.reload();
    }

 
    
  searchResultsHandler = (e) => {
    var data = {
        query : this.state.query,
    }
    console.log("Inside search results")

    this.props.saveSearchPeopleFieldToStore(data);
    this.setState({
        redirectToPeopleResultsPage : true
      });
       
}

queryChangeHandler = (e) => {
    this.setState({
        query: e.target.value
    })
} */

render() {
    return (
        <JobHeader />
//         <div className="header-container">
//             <div className="container">
//                 <div className="header-content-container">
//                     <img className="img-container linkedIn-logo" src="http://www.theredbrickroad.com/wp-content/uploads/2017/05/linkedin-logo-copy.png" alt="logo"></img>
//                     <input className="search-box rounded" type="text" placeholder="Search"/>
//                    <span className="nav-links">
//                    <span className="iconDesc homeiconDesc">
//                    {/* <svg viewBox="0 0 24 24" width="24px" height="24px" x="0" y="0" preserveAspectRatio="xMinYMin meet" class="nav-icon" focusable="false" xmlns="http://www.w3.org/2000/svg"><path d="M16,17.85V20a1,1,0,0,1-1,1H1a1,1,0,0,1-1-1V17.85a4,4,0,0,1,2.55-3.73l2.95-1.2V11.71l-0.73-1.3A6,6,0,0,1,4,7.47V6a4,4,0,0,1,4.39-4A4.12,4.12,0,0,1,12,6.21V7.47a6,6,0,0,1-.77,2.94l-0.73,1.3v1.21l2.95,1.2A4,4,0,0,1,16,17.85Zm4.75-3.65L19,13.53v-1a6,6,0,0,0,1-3.31V9a3,3,0,0,0-6,0V9.18a6,6,0,0,0,.61,2.58A3.61,3.61,0,0,0,16,13a3.62,3.62,0,0,1,2,3.24V21h4a1,1,0,0,0,1-1V17.47A3.5,3.5,0,0,0,20.75,14.2Z" class="active-item"></path><path d="M20.74,14.2L19,13.54V12.86l0.25-.41A5,5,0,0,0,20,9.82V9a3,3,0,0,0-6,0V9.82a5,5,0,0,0,.75,2.63L15,12.86v0.68l-1,.37a4,4,0,0,0-.58-0.28l-2.45-1V10.83A8,8,0,0,0,12,7V6A4,4,0,0,0,4,6V7a8,8,0,0,0,1,3.86v1.84l-2.45,1A4,4,0,0,0,0,17.35V20a1,1,0,0,0,1,1H22a1,1,0,0,0,1-1V17.47A3.5,3.5,0,0,0,20.74,14.2ZM16,8.75a1,1,0,0,1,2,0v1.44a3,3,0,0,1-.38,1.46l-0.33.6a0.25,0.25,0,0,1-.22.13H16.93a0.25,0.25,0,0,1-.22-0.13l-0.33-.6A3,3,0,0,1,16,10.19V8.75ZM6,5.85a2,2,0,0,1,4,0V7.28a6,6,0,0,1-.71,2.83L9,10.72a1,1,0,0,1-.88.53H7.92A1,1,0,0,1,7,10.72l-0.33-.61A6,6,0,0,1,6,7.28V5.85ZM14,19H2V17.25a2,2,0,0,1,1.26-1.86L7,13.92v-1a3,3,0,0,0,1,.18H8a3,3,0,0,0,1-.18v1l3.72,1.42A2,2,0,0,1,14,17.21V19Zm7,0H16V17.35a4,4,0,0,0-.55-2l1.05-.4V14.07a2,2,0,0,0,.4.05h0.2a2,2,0,0,0,.4-0.05v0.88l2.53,1a1.5,1.5,0,0,1,1,1.4V19Z" class="inactive-item"></path></svg> */}
//                     <Link to="/">
//                     <div>
//                     <svg className="iconColor" xmlns="http://www.w3.org/2000/svg" width="30" height="27" viewBox="0 0 24 24"><path d="M20 7.093v-5.093h-3v2.093l3 3zm4 5.907l-12-12-12 12h3v10h7v-5h4v5h7v-10h3zm-5 8h-3v-5h-8v5h-3v-10.26l7-6.912 76.99V10.182Z"/></svg>
//                     </div>
//                     <p className="iconDesc">Home</p>
//                     </Link>
//                     </span>

//                     <span className="iconDesc myNetworkimg">
//                     <Link to="/my-network">
//                     <div>
//                     <svg className="iconColor" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><path d="M10.119 16.064c2.293-.53 4.427-.994 3.394-2.946-3.147-5.941-.835-9.118 2.488-9.118 3.388 0 5.643 3.299 2.488 9.119-1.065 1.964 1.149 2.427 3.393 2.946 1.985.458 2.118 1.428 2.118 3.107l-.003.828h-1.329c0-2.089.083-2.367-1.226-2.669-1.901-.438-3.695-.852-4.351-2.304-.239-.53-.395-1.402.226-2.543 1.372-2.532 1.719-4.726.949-6.017-.902-1.517-3.617-1.509-4.512-.022-.768 1.273-.426 3.479.936 6.05.607 1.146.447 2.016.206 2.543-.66 1.445-2.472 1.863-4.39 2.305-1.252.29-1.172.588-1.172 2.657h-1.331c0-2.196-.176-3.406 2.116-3.936zm-10.117 3.936h1.329c0-1.918-.186-1.385 1.824-1.973 1.014-.295 1.91-.723 2.316-1.612.212-.463.355-1.22-.162-2.197-.952-1.798-1.219-3.374-.712-4.215.547-.909 2.27-.908 2.819.015.935 1.567-.793 3.982-1.02 4.982h1.396c.44-1 1.206-2.208 1.206-3.9 0-2.01-1.312-3.1-2.998-3.1-2.493 0-4.227 2.383-1.866 6.839.774 1.464-.826 1.812-2.545 2.209-1.49.345-1.589 1.072-1.589 2.334l.002.618z"/></svg>
//                     {/* <svg className="iconColor" xmlns="http://www.w3.org/2000/svg" width="40" height="35" viewBox="0 0 24 24"><path d="M17.997 18h-.998c0-1.552.06-1.775-.88-1.993-1.438-.332-2.797-.645-3.293-1.729-.18-.396-.301-1.048.155-1.907 1.021-1.929 1.277-3.583.702-4.538-.672-1.115-2.707-1.12-3.385.017-.576.968-.316 2.613.713 4.512.465.856.348 1.51.168 1.908-.49 1.089-1.836 1.4-3.262 1.728-.982.227-.92.435-.92 2.002h-.995l-.002-.623c0-1.259.1-1.985 1.588-2.329 1.682-.389 3.344-.736 2.545-2.209-2.366-4.365-.676-6.839 1.865-6.839 2.492 0 4.227 2.383 1.867 6.839-.775 1.464.824 1.812 2.545 2.209 1.49.344 1.589 1.072 1.589 2.333l-.002.619zm4.81-2.214c-1.289-.298-2.489-.559-1.908-1.657 1.77-3.342.47-5.129-1.4-5.129-1.265 0-2.248.817-2.248 2.325 0 1.269.574 2.175.904 2.925h1.048c-.17-.75-1.466-2.562-.766-3.736.412-.692 1.704-.693 2.114-.012.38.631.181 1.812-.534 3.161-.388.733-.28 1.301-.121 1.648.305.666.977.987 1.737 1.208 1.507.441 1.368.042 1.368 1.48h.997l.002-.463c0-.945-.074-1.492-1.193-1.75zm-22.805 2.214h.997c0-1.438-.139-1.039 1.368-1.48.761-.221 1.433-.542 1.737-1.208.159-.348.267-.915-.121-1.648-.715-1.349-.914-2.53-.534-3.161.41-.682 1.702-.681 2.114.012.7 1.175-.596 2.986-.766 3.736h1.048c.33-.75.904-1.656.904-2.925.001-1.509-.982-2.326-2.247-2.326-1.87 0-3.17 1.787-1.4 5.129.581 1.099-.619 1.359-1.908 1.657-1.12.258-1.194.805-1.194 1.751l.002.463z"/></svg>                        */}
//                     </div>
//                     <p className="iconDesc">My Network</p>
//                     </Link>

//                     </span>
//                     <span className="iconDesc myJobs">
//                     <Link to="/jobs">
//                     <div>
//                     <svg className="iconColor" xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24"><path d="M0 7v15h24v-15h-24zm22 13h-20v-6h6v-2h-6v-3h20v3h-6v2h6v6zm-13-15.5c0-.276.224-.5.5-.5h5c.276 0 .5.224.5.5v1.5h2v-2c0-1.104-.896-2-2-2h-6c-1.104 0-2 .896-2 2v2h2v-1.5zm5 6.5h-4v4h4v-4z"/></svg>                       
//                     </div>
//                     <p className="iconDesc">Jobs</p>
//                     </Link>
//                     </span>

//                     <span className="iconDesc myJobs">
//                     <Link to="#">
//                     <div>
//                     <svg className="iconColor" width="23" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M24 20h-3v4l-5.333-4h-7.667v-4h2v2h6.333l2.667 2v-2h3v-8.001h-2v-2h4v12.001zm-15.667-6l-5.333 4v-4h-3v-14.001l18 .001v14h-9.667zm-6.333-2h3v2l2.667-2h8.333v-10l-14-.001v10.001z"/></svg>
//                     </div>
//                     <p className="iconDesc">Messaging</p>
//                     </Link>
//                     </span>

//                     <span className="iconDesc myJobs">
//                     <ul class="nav navbar-nav">
//                         <li class="dropdown">
//       <a href="#" class="dropdown-toggle dropdownFontColor" data-toggle="dropdown">
//       {/* <img src=""/> */}
//       <img src = {profilePic} height="50" className="profileimage"/>
//                     <br/>
//       Me<span class="glyphicon glyphicon-user pull-right"></span></a>
//       <ul class="dropdown-menu">
//         <li><Link to="/profile">Profile<span class="glyphicon glyphicon-cog pull-right"></span></Link></li>
//         <li class="divider"></li>
//         <li><a onClick = {this.handleLogout}>Sign Out <span class="glyphicon glyphicon-log-out pull-right"></span></a></li>
//       </ul>
//     </li>
//   </ul>
//   </span>
             
//                     </span>
//                 </div>
//             </div>
//         </div>
    );
}
}

/* const mapStateToProps  = state =>({
    saveSearchPeopleFieldToStore : state.peopleSearchFieldsStateStore
  });
  
  
//export default JobsLandingPage;
export default connect(mapStateToProps, {saveSearchPeopleFieldToStore})(Header); */

export default Header;