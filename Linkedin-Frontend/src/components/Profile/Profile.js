import React, { Component } from "react";
import Header from "../Header/Header";
import "./modal.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as helper from "../../utils/helper";
import {Redirect} from 'react-router';

class Profile extends Component {
  constructor(props) {
    super(props);
    console.log(props);

    this.state = {
      test: [],
      testedu: [],
      fname: "",
      lname: "",
      company: "",
      city: "",
      aboutMe: "",
      headline: "",
      zipcode: "",
      stateval: "",

      //copy
      fname1: "",
      lname1: "",
      company1: "",
      city1: "",
      aboutMe1: "",
      headline1: "",
      zipcode1: "",
      stateval1: "",
      //rerender variable

      isupdated: 0,

      //experience
      experience: [],
      tempexp: [],

      exp1: [],

      experienceid: 0,
      showmodaleditexperience: false,
      showmodaladdexperience: false,

      //add new experience in array variables
      adddesignation: "",
      addcompanyname: "",
      addlocation: "",
      addresponsibility: "",

      addtestdesignation: "",
      addtestcompanyname: "",
      addtestlocation: "",
      addtestresponsibility: "",

      //education variables
      education: [],
      tempedu: [],
      edu1: [],

      educationid: 0,
      showmodalediteducation: false,
      showmodaladdeducation: false,
      isexpUpdated: false,
      //add new experience in array variables
      addschool: "",
      adddegree: "",
      addfromyear: "",
      addtoyear: "",

      addtesteduschool: "",
      addtestedudegree: "",
      addtestedufromyear: "",
      addtestedutoyear: "",
      profileimage: "",
      profileImage: "",

      //skills
      skills: [],
      skillstr: "",

      //cancel reload
      rel: false
    };
  }

  //axios post calls to backend after saving changes in modal

  //call to save edited personal details
  savepersonaldetailschanges = e => {
    e.preventDefault();
    console.log("inside save pd call");

    // zipcode validation
    var regexresult = /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(this.state.zipcode);
    console.log("Result of zipcode regex", regexresult);

    //us state validation

    var checkstate = false;
    if (
      helper.stateAbbreviations.includes(this.state.stateval) ||
      helper.statenames.includes(this.state.stateval)
    ) {
      checkstate = true;
    }

    if (regexresult == true && checkstate == true) {
      console.log("value of regex is true");
      var email = this.props.loginStateStore.result.email;
      console.log("Emaild id is:", email);
      console.log("About me values is", this.state.aboutMe);
      var data = {
        email: email,
        Fname: this.state.fname,
        Lname: this.state.lname,
        headline: this.state.headline,
        company: this.state.company,
        city: this.state.city,
        aboutMe: this.state.aboutMe,
        zipcode: this.state.zipcode,
        stateval: this.state.stateval,
        profileimage: this.state.profileimage
      };
      console.log("axios pd data is ", data);
      axios
        .post("http://localhost:3001/updatepdprofile", data)
        .then(response => {
          if (response.status === 200) {
            console.log("inside resp status");
            var isupdated = 1 + this.state.isupdated;
            this.setState({ isupdated: isupdated });
            this.fetchprofiledbcall();
          } else {
            console.log("error updating");
          }
          console.log("state", this.state.isupdated);
        });
    } else if (regexresult == false && checkstate == true) {
      console.log("Invalid US zip code");
      alert("Please enter a valid US zip code!!");
    } else if (regexresult == true && checkstate == false) {
      console.log("Invalid US state: malformed_state exception");
      alert("Please enter a valid US State!!,malformed_state exception");
    } else {
      console.log(
        "Invalid US zip code && Invalid US state: malformed_state exception"
      );
      alert(
        "Please enter a valid US zip code and State!!:malformed_state exception"
      );
    }
  };

  //call to save edited skills changes
  saveskillschanges = e => {
    console.log("inside save skill axios call");
    e.preventDefault();
    // var email = sessionStorage.getItem('key');
    var email = this.props.loginStateStore.result.email;
    console.log("Emaild id is:", email);

    var data = { email: email, skills: this.state.skillstr };
    console.log("axios skills data is ", data);
    axios
      .post("http://localhost:3001/updateskillsprofile", data)
      .then(response => {
        console.log(response);
        if (response.status === 200) {
          var isupdated = 1 + this.state.isupdated;
          this.setState({ isupdated: isupdated });
          this.fetchprofiledbcall();
        } else {
          console.log("error updating");
        }
        //console.log("state",isupdated);
        console.log("",this.state.skillstr);
        
    })

}

deleteAccount=()=>{
    console.log("delete Account")
    axios.defaults.withCredentials = true;
    axios.get('http://localhost:3001/deleteAccount/'+ this.props.loginStateStore.result.email)
    .then((response)=>{
        if(response.status === 200){
            console.log("deleted account");
        }
    });
    window.location.reload();
}

  //axios post call section ends
  fetchprofiledbcall = () => {
    //e.preventDefault();
    console.log("COMPONENT DID MOUNT");
    if (
      this.props.loginStateStore.result !== null &&
      this.props.loginStateStore.result !== undefined
    ) {
      var email = this.props.loginStateStore.result.email;
      console.log("Emaild id is:", email);
      const data = { email: email };
      // variable s would contain response string from fetch for skills
      axios.post("http://localhost:3001/FetchProfile", data).then(response => {
        //update the state with the response data
        console.log(response.data);
        console.log("Response of did mount", response);
        var output = response.data;
        console.log("output is", output.docs);

        var experience1 = output.docs.user.experience;
        console.log("experience1", experience1);
        var test = output.docs.user.experience;
        var testedu = output.docs.user.education;

        var experience = [...output.docs.user.experience];
        var education = [...output.docs.user.education];

        var tempexp = [...output.docs.user.experience];

        var tempedu = [...output.docs.user.education];

        var s = output.docs.user.skills;

        var skillsresult = s.split(",");

        console.log("above this.state", skillsresult);
        console.log("test value is", test);
        console.log("end");
        console.log(this.state.profileimage);
        axios
          .post(
            "http://localhost:3001/download/" +
              response.data.docs.user.profileimage
          )
          .then(response => {
            console.log("inside download file");

            var profileImage = "data:image/jpg;base64, " + response.data;
            this.setState({
              profileImage: profileImage
            });
          });
        this.setState({
          test: test,
          testedu: testedu,
          fname: output.docs.user.Fname,
          lname: output.docs.user.Lname,
          headline: output.docs.user.headline,
          company: output.docs.user.company,
          city: output.docs.user.output,
          aboutMe: output.docs.user.aboutMe,
          zipcode: output.docs.user.zip,
          stateval: output.docs.user.state,
          //copy
          fname1: output.docs.user.Fname,
          lname1: output.docs.user.Lname,
          headline1: output.docs.user.headline,
          company1: output.docs.user.company,
          city1: output.docs.user.city,
          aboutMe1: output.docs.user.aboutMe,
          zipcode1: output.docs.user.zip,
          stateval1: output.docs.user.state,
          experience: experience,

          education: education,

          tempexp: tempexp,
          tempedu: tempedu,

          skills: skillsresult,
          skillstr: s,

          experienceid: 0,

          educationid: 0
          // profileimage : profileImage
        });

        /*   console.log("thisi is m experience array state",this.state.experience);
              console.log(output.docs);
              console.log("fname db",output.docs.user.Fname);
              console.log('Fname',this.state.fname);
              console.log('Fname',this.state.company);
              console.log('Fname',this.state.city);
              console.log('skillstr',this.state.skillstr);
              console.log('skill',this.state.skill);
              console.log('skillsresult',skillsresult);
              console.log('test after setting it',this.state.test); */
      });
    }
  };

  //component did mount for the first render
  componentDidMount() {
    this.fetchprofiledbcall();
  }

  //assign array index id to modal to populate particular array element //handle edit experience modal
  handleeditexperiencemodal = id => {
    console.log("Index is", id);
    this.setState({
      experienceid: id,
      showmodaleditexperience: true
    });
  };

  handledeleteexperiencemodal = id => {
    var experience = [...this.state.experience];

    var index = id;
    if (index > -1) {
      experience.splice(index, 1);
    }
    // array = [2, 9]
    console.log("Experience is ", experience);
    var email = this.props.loginStateStore.result.email;
    console.log("Emaild id is:", email);

    var data = { email: email, experience: experience };
    axios
      .post("http://localhost:3001/updateexpprofile", data)
      .then(response => {
        console.log("Resose", response);
        if (response.status === 200) {
          console.log("Inside del");
          this.setState({ isExpUpdated: true });
        }
        this.fetchprofiledbcall();
      });
  };

  //handle add experience modal

  handleaddexperiencemodal = () => {
    console.log("test");
    this.setState({
      showmodaladdexperience: true
    });
  };

  //handle add object to experience array
  handleaddtoexperiencearray = e => {
    e.preventDefault();
    const addtestcompanyname = this.state.addtestcompanyname;
    const addtestdesignation = this.state.addtestdesignation;
    const addtestlocation = this.state.addtestlocation;
    const addtestresponsibility = this.state.addtestresponsibility;
    const obj = {
      designation: addtestdesignation,
      companyname: addtestcompanyname,
      location: addtestlocation,
      responsibility: addtestresponsibility
    };
    const test = this.state.test.slice();
    test.push(obj);
    console.log("test the o/p", test);
    //var email = sessionStorage.getItem('key');
    var email = this.props.loginStateStore.result.email;
    console.log("Emaild id is:", email);

    var data = { email: email, experience: test };
    axios
      .post("http://localhost:3001/updateexpprofile", data)
      .then(response => {
        console.log(response);
        console.log("experience val", this.state.test);
        this.fetchprofiledbcall();
      });
  };

  //fieldchanges for experience
  handlefieldchangesexperience = event => {
    console.log(
      "Exeperience 0 ",
      this.state.experience[this.state.experienceid].designation
    );
    console.log(event.target.id);
    console.log(event.target.value);
    const idvar = event.target.id;
    const val = event.target.value;

    if (event.target.id === "designation") {
      var experience = [...this.state.experience];
      const experienceid = this.state.experienceid;
      experience[experienceid].designation = event.target.value;
      console.log("experience designation", experience);
      this.setState({ experience: experience });
      console.log(this.state.experience);
    }

    if (event.target.id === "companyname") {
      var experience1 = [...this.state.experience];
      const experienceid = this.state.experienceid;
      experience1[experienceid].companyname = event.target.value;
      console.log("experience companyname", experience1);
      this.setState({ experience: experience1 });
      console.log(this.state.experience);
    }

    if (event.target.id === "location") {
      var experience2 = [...this.state.experience];
      const experienceid = this.state.experienceid;
      experience2[experienceid].location = event.target.value;
      console.log("experience location", experience2);
      this.setState({ experience: experience2 });
      console.log(this.state.experience);
    }

    if (event.target.id === "responsibility") {
      var experience3 = [...this.state.experience];
      const experienceid = this.state.experienceid;
      experience3[experienceid].responsibility = event.target.value;
      console.log("experience responsiblilty", experience3);
      this.setState({ experience: experience3 });
      console.log(this.state.experience);
    }
  };

  //cancel edit experience start

  canceleditexperiencechanges = e => {
    e.preventDefault();
    this.setState({ rel: true });
    this.fetchprofiledbcall();
    //console.log("Reload value for cancel",this.state.rel);
    //window.location.reload();
  };

  //cancel edit experience end

  saveeditexperiencechanges = e => {
    e.preventDefault();
    console.log("edit experience of the ", this.state.experience);
    //var email = sessionStorage.getItem('key');
    var email = this.props.loginStateStore.result.email;
    console.log("Emaild id is:", email);

    var data = { email: email, experience: this.state.experience };

    console.log("axios experience data is edited ", data);
    axios
      .post("http://localhost:3001/updateexpprofile", data)
      .then(response => {
        console.log(response);
        console.log("experience val", this.state.experience);
        this.fetchprofiledbcall();
      });
  };

  //For education functions start

  handleediteducationmodal = id1 => {
    this.setState({
      educationid: id1,
      showmodalediteducation: true
    });
  };

  handledeleteeducationmodal = id1 => {
    var education = [...this.state.education];

    var index1 = id1;
    if (index1 > -1) {
      education.splice(index1, 1);
    }
    // array = [2, 9]
    console.log(education);

    //var email = sessionStorage.getItem('key');
    var email = this.props.loginStateStore.result.email;
    console.log("Emaild id is:", email);

    var data = { email: email, education: education };
    axios
      .post("http://localhost:3001/updateeduprofile", data)
      .then(response => {
        console.log("Response", response);
        if (response.status === 200) {
          console.log("Inside del");
          this.setState({ isEduUpdated: true });
          this.fetchprofiledbcall();
        }
      });
  };

  //handle add experience modal

  handleaddeducationmodal = () => {
    console.log("test1");
    this.setState({
      showmodaladdeducation: true
    });
  };

  //handle add object to education array
  handleaddtoeducationarray = e => {
    e.preventDefault();
    const addtesteduschool = this.state.addtesteduschool;
    const addtestedudegree = this.state.addtestedudegree;
    const addtestedufromyear = this.state.addtestedufromyear;
    const addtestedutoyear = this.state.addtestedutoyear;
    const obj = {
      school: addtesteduschool,
      degree: addtestedudegree,
      fromyear: addtestedufromyear,
      toyear: addtestedutoyear
    };
    const testedu = this.state.testedu.slice();
    testedu.push(obj);
    console.log("test the o/p", testedu);
    //var email = sessionStorage.getItem('key');
    var email = this.props.loginStateStore.result.email;
    console.log("Emaild id is:", email);

    var data = { email: email, education: testedu };
    console.log("data is", data);
    console.log("exp is", this.state.experience);
    axios
      .post("http://localhost:3001/updateeduprofile", data)
      .then(response => {
        console.log(response);
        console.log("educcation val", this.state.testedu);
        console.log("CHECKPOINT");
        this.fetchprofiledbcall();
      });
  };

  //fieldchanges for experience
  handlefieldchangeseducation = event => {
    console.log(
      "Education 0 ",
      this.state.education[this.state.educationid].school
    );
    console.log(event.target.id);
    console.log(event.target.value);
    const idvar = event.target.id;
    const val = event.target.value;

    if (event.target.id === "school") {
      var education = [...this.state.education];
      const educationid = this.state.educationid;
      education[educationid].school = event.target.value;
      console.log("education", education);
      this.setState({ education: education });
      console.log(this.state.education);
    }

    if (event.target.id === "degree") {
      var education1 = [...this.state.education];
      const educationid = this.state.educationid;
      education1[educationid].degree = event.target.value;
      console.log("education", education1);
      this.setState({ education: education1 });
      console.log(this.state.education);
    }

    if (event.target.id === "fromyear") {
      var education2 = [...this.state.education];
      const educationid = this.state.educationid;
      education2[educationid].fromyear = event.target.value;
      console.log("education", education2);
      this.setState({ education: education2 });
      console.log(this.state.education);
    }

    if (event.target.id === "toyear") {
      var education3 = [...this.state.education];
      const educationid = this.state.educationid;
      education3[educationid].toyear = event.target.value;
      console.log("education", education3);
      this.setState({ education: education3 });
      console.log(this.state.education);
    }
  };
  //cancel edit educatioon start

  cancelediteducationchanges = e => {
    e.preventDefault();
    this.fetchprofiledbcall();
  };

  //cancel edit education end

  saveediteducationchanges = e => {
    e.preventDefault();
    console.log("edit education of the ", this.state.education);
    //var email = sessionStorage.getItem('key');
    var email = this.props.loginStateStore.result.email;
    console.log("Emaild id is:", email);

    var data = { email: email, education: this.state.education };

    console.log("axios education data is edited ", data);
    axios
      .post("http://localhost:3001/updateeduprofile", data)
      .then(response => {
        console.log(response);
        console.log("education val", this.state.education);
        this.fetchprofiledbcall();
      });
  };

  //handle fieldchanges for personal details,experience,education variables in state
  handlefieldchanges = event => {
    this.setState({ [event.target.id]: event.target.value });
  };

  //For Image upload
  handleChange = e => {
    const target = e.target;
    console.log(target.files);
    var profilePhoto = target.files[0];
    var data = new FormData();
    data.append("photos", profilePhoto);
    axios.defaults.withCredentials = true;
    axios
      .post("http://localhost:3001/upload_file", data)
      .then(response => {
        if (response.status === 200) {
          console.log("Profile Photo Name: ", profilePhoto.name);
          this.setState({
            profileimage: profilePhoto.name
          });
        }
      })
      .catch(err => {
        if (err) {
          this.setState({
            errorRedirect: true
          });
        }
      });
  };

  render() {
    //personal detail section start
    var redirectVar=null;
    if(!this.props.loginStateStore.result) {
      redirectVar = <Redirect to= "/login"/>
  }
    var modalpersonaldetails = (
      <div>
        <div>
          <div>
            <button
              type="button"
              class="profile-btn btn btn-primary"
              data-toggle="modal"
              data-target="#basicExampleModal"
            >
              Edit Personal Details
            </button>
          </div>

          <div
            class="modal fade modalStyle"
            id="basicExampleModal"
            tabindex="-1"
            role="dialog"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div
              class="modal-dialog modal-lg modalStyle"
              role="document"
              width="750px"
              margin="auto"
            >
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">
                    Personal Details
                  </h5>
                  <button
                    type="button"
                    class="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  <div className="form-group">
                    <label className="grey-text">First Name</label>
                    <input
                      label="fname"
                      icon="fa-map-pin"
                      group
                      value={this.state.fname}
                      type="text"
                      id="fname"
                      validate
                      error="wrong"
                      success="right"
                      onChange={this.handlefieldchanges}
                      className="form-input form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label className="grey-text">Last Name</label>
                    <input
                      label="lname"
                      icon="fa-map-pin"
                      group
                      value={this.state.lname}
                      type="text"
                      id="lname"
                      validate
                      error="wrong"
                      success="right"
                      onChange={this.handlefieldchanges}
                      className="form-input form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label className="grey-text">Headline</label>
                    <input
                      label="currentposition"
                      icon="fa-map-pin"
                      group
                      value={this.state.headline}
                      type="text"
                      id="headline"
                      validate
                      error="wrong"
                      success="right"
                      onChange={this.handlefieldchanges}
                      className="form-input form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label className="grey-text">Current Position</label>
                    <input
                      label="currentposition"
                      icon="fa-map-pin"
                      group
                      value={this.state.company}
                      type="text"
                      id="company"
                      validate
                      error="wrong"
                      success="right"
                      onChange={this.handlefieldchanges}
                      className="form-input form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label className="grey-text">City</label>
                    <input
                      label="country"
                      icon="fa-map-pin"
                      group
                      value={this.state.city}
                      type="text"
                      id="city"
                      validate
                      error="wrong"
                      success="right"
                      onChange={this.handlefieldchanges}
                      className="form-input form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label className="grey-text">About Me</label>
                    <input
                      label="aboutMe"
                      icon="fa-map-pin"
                      group
                      value={this.state.aboutMe}
                      type="text"
                      id="aboutMe"
                      validate
                      error="wrong"
                      success="right"
                      onChange={this.handlefieldchanges}
                      className="form-input form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label className="grey-text">State</label>
                    <input
                      label="stateval"
                      icon="fa-map-pin"
                      group
                      value={this.state.stateval}
                      type="text"
                      id="stateval"
                      validate
                      error="wrong"
                      success="right"
                      onChange={this.handlefieldchanges}
                      className="form-input form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label className="grey-text">ZipCode</label>
                    <input
                      label="zipcode"
                      icon="fa-map-pin"
                      group
                      value={this.state.zipcode}
                      type="text"
                      id="zipcode"
                      validate
                      error="wrong"
                      success="right"
                      onChange={this.handlefieldchanges}
                      className="form-input form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label className="grey-text">Profile Image</label>
                    <input
                      label="profileimage"
                      icon="fa-map-pin"
                      group
                      type="file"
                      id="profileimage"
                      validate
                      error="wrong"
                      success="right"
                      onChange={this.handleChange}
                      className="form-input form-control"
                    />
                  </div>
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    data-dismiss="modal"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    class="btn btn-primary"
                    onClick={this.savepersonaldetailschanges}
                  >
                    Save changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );

    //personal detail section end
    //**************************************************************************** */
    //experience section starts

    //

    if (this.state.showmodaladdexperience === true) {
      var modaladdexperience = (
        <div>
          <div>
            <div
              class="modal fade modalStyle"
              id="basicExampleModalExperienceADD"
              tabindex="-1"
              role="dialog"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div
                class="modal-dialog modal-lg modalStyle"
                role="document"
                width="750px"
                margin="auto"
              >
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">
                      Experience
                    </h5>
                    <button
                      type="button"
                      class="close"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">
                    <div>
                      <label className="grey-text">Designation</label>
                      <input
                        label="designation"
                        icon="fa-map-pin"
                        placeholder="your designation"
                        id="addtestdesignation"
                        group
                        type="text"
                        validate
                        error="wrong"
                        success="right"
                        onChange={this.handlefieldchanges}
                        className="form-input form-control"
                      />
                    </div>
                    <div>
                      <label className="grey-text">Company Name</label>
                      <input
                        label="companyname"
                        icon="fa-map-pin"
                        group
                        type="text"
                        placeholder="your workplace's name"
                        id="addtestcompanyname"
                        validate
                        error="wrong"
                        success="right"
                        onChange={this.handlefieldchanges}
                        className="form-input form-control"
                      />
                    </div>
                    <div>
                      <label className="grey-text">Location</label>
                      <input
                        label="Location"
                        icon="fa-map-pin"
                        group
                        type="text"
                        placeholder="your location's place"
                        id="addtestlocation"
                        validate
                        error="wrong"
                        success="right"
                        onChange={this.handlefieldchanges}
                        className="form-input form-control"
                      />
                    </div>
                    <div>
                      <label className="grey-text">Responsibility</label>
                      <input
                        label="Responsibility"
                        icon="fa-map-pin"
                        group
                        type="text"
                        placeholder="your role"
                        id="addtestresponsibility"
                        validate
                        error="wrong"
                        success="right"
                        onChange={this.handlefieldchanges}
                        className="form-input form-control"
                      />
                    </div>
                  </div>
                  <div class="modal-footer">
                    <button
                      type="button"
                      class="btn btn-secondary"
                      data-dismiss="modal"
                    >
                      Close
                    </button>
                    <button
                      type="button"
                      class="btn btn-primary"
                      onClick={this.handleaddtoexperiencearray}
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
</div>
            </div>
          </div>
    
      );
    }

    var it = -1;
    const test1 = this.state.test;
    console.log("tempexp is", test1);
    const experiencevar = test1.map((experiencevalues, index) => {
      it = it + 1;
      var id = 0;
      return (
        <div>
          <h5>{experiencevalues.designation}</h5>
          <h5>{experiencevalues.companyname}</h5>
          <h5>{experiencevalues.location}</h5>
          <h5>{experiencevalues.responsibility}</h5>
          <button
            type="button"
            class="profile-btn btn btn-primary"
            onClick={() => this.handledeleteexperiencemodal(index)}
          >
            delete
          </button>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <button
            type="button"
            class="profile-btn btn btn-primary"
            data-toggle="modal"
            data-target="#basicExampleModalExperience"
            onClick={() => this.handleeditexperiencemodal(index)}
          >
            edit
          </button>
          <hr />
        </div>
      );
    });

    if (
      this.state.showmodaleditexperience === true &&
      this.state.test.length > 0
    ) {
      console.log("tesst is value", this.state.test);
      console.log("id val", this.state.experienceid);
      console.log("exp array", this.state.experience);
      var modaleditexperience = (
        <div>
          <div>
            <div
              class="modal fade modalStyle"
              id="basicExampleModalExperience"
              tabindex="-1"
              role="dialog"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div
                class="modal-dialog modal-lg modalStyle"
                role="document"
                width="750px"
                margin="auto"
              >
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">
                      Experience
                    </h5>
                    <button
                      type="button"
                      class="close"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">
                    <div>
                      <label className="grey-text">Designation</label>
                      <input
                        label="designation"
                        icon="fa-map-pin"
                        value={
                          this.state.experience[this.state.experienceid]
                            .designation
                        }
                        id="designation"
                        group
                        type="text"
                        validate
                        error="wrong"
                        success="right"
                        onChange={this.handlefieldchangesexperience}
                        className="form-control form-input"
                      />
                    </div>
                    <div>
                      <label className="grey-text">Company Name</label>
                      <input
                        label="companyname"
                        icon="fa-map-pin"
                        group
                        value={
                          this.state.experience[this.state.experienceid]
                            .companyname
                        }
                        type="text"
                        id="companyname"
                        validate
                        error="wrong"
                        success="right"
                        onChange={this.handlefieldchangesexperience}
                        className="form-control form-input"
                      />
                    </div>
                    <div>
                      <label className="grey-text">Location</label>
                      <input
                        label="Location"
                        icon="fa-map-pin"
                        group
                        value={
                          this.state.experience[this.state.experienceid]
                            .location
                        }
                        type="text"
                        id="location"
                        validate
                        error="wrong"
                        success="right"
                        onChange={this.handlefieldchangesexperience}
                        className="form-control form-input"
                      />
                    </div>
                    <div>
                      <label className="grey-text">Responsibility</label>
                      <input
                        label="Responsibility"
                        icon="fa-map-pin"
                        group
                        value={
                          this.state.experience[this.state.experienceid]
                            .responsibility
                        }
                        type="text"
                        id="responsibility"
                        validate
                        error="wrong"
                        success="right"
                        onChange={this.handlefieldchangesexperience}
                        className="form-control form-input"
                      />
                    </div>
                  </div>
                  <div class="modal-footer">
                    <button
                      type="button"
                      class="btn btn-secondary"
                      data-dismiss="modal"
                      onClick={this.canceleditexperiencechanges}
                    >
                      Close
                    </button>
                    <button
                      type="button"
                      class="btn btn-primary"
                      onClick={this.saveeditexperiencechanges}
                    >
                      Save changes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
    //experience section end
    //**************************************************************************** */

    //education section start

    var addeducationmodalvar = (
      <button
        type="button"
        class="profile-btn btn btn-primary"
        data-toggle="modal"
        data-target="#basicExampleModalEducationADD"
        onClick={this.handleaddeducationmodal}
      >
        Add Education
      </button>
    );

    if (this.state.showmodaladdeducation === true) {
      var modaladdeducation = (
        <div>
          <div>
            <div
              class="modal fade modalStyle"
              id="basicExampleModalEducationADD"
              tabindex="-1"
              role="dialog"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div
                class="modal-dialog modal-lg modalStyle"
                role="document"
                width="750px"
                margin="auto"
              >
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">
                      Education
                    </h5>
                    <button
                      type="button"
                      class="close"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">
                    <div>
                      <label className="grey-text">University Name</label>
                      <input
                        label="school"
                        icon="fa-map-pin"
                        placeholder="Ex. sjsu"
                        id="addtesteduschool"
                        group
                        type="text"
                        validate
                        error="wrong"
                        success="right"
                        onChange={this.handlefieldchanges}
                        className="form-control form-input"
                      />
                    </div>
                    <div>
                      <label className="grey-text">Degree</label>
                      <input
                        label="degree"
                        icon="fa-map-pin"
                        group
                        type="text"
                        placeholder="Ex. Bachelor's"
                        id="addtestedudegree"
                        validate
                        error="wrong"
                        success="right"
                        onChange={this.handlefieldchanges}
                        className="form-control form-input"
                      />
                    </div>
                    <div>
                      <label className="grey-text">From Year</label>
                      <input
                        label="fromyear"
                        icon="fa-map-pin"
                        group
                        type="date"
                        placeholder="Year"
                        id="addtestedufromyear"
                        validate
                        error="wrong"
                        success="right"
                        onChange={this.handlefieldchanges}
                        className="form-control form-input"
                      />
                    </div>
                    <div>
                      <label className="grey-text">To Year</label>
                      <input
                        label="toyear"
                        icon="fa-map-pin"
                        group
                        type="date"
                        placeholder="Year"
                        id="addtestedutoyear"
                        validate
                        error="wrong"
                        success="right"
                        onChange={this.handlefieldchanges}
                        className="form-control form-input"
                      />
                    </div>
                  </div>
                  <div class="modal-footer">
                    <button
                      type="button"
                      class="btn btn-secondary"
                      data-dismiss="modal"
                    >
                      Close
                    </button>
                    <button
                      type="button"
                      class="btn btn-primary"
                      data-dismiss="modal"
                      onClick={this.handleaddtoeducationarray}
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    var it1 = -1;
    const test2 = this.state.testedu;
    console.log("test2 is", test2);
    const educationvar = test2.map((educationvalues, index) => {
      it1 = it1 + 1;
      var id1 = 0;
      return (
        <div>
          <h5>{educationvalues.school}</h5>
          <h5>{educationvalues.degree}</h5>
          <h5>{educationvalues.fromyear}</h5>
          <h5>{educationvalues.toyear}</h5>
          <button
            type="button"
            class="profile-btn btn btn-primary"
            value={it1}
            onClick={() => this.handledeleteeducationmodal(index)}
          >
            delete
          </button>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <button
            type="button"
            class="profile-btn btn btn-primary"
            value={it1}
            data-toggle="modal"
            data-target="#basicExampleModalEducation"
            onClick={() => this.handleediteducationmodal(index)}
          >
            edit
          </button>
          <hr />
        </div>
      );
    });

    if (
      this.state.showmodalediteducation === true &&
      this.state.testedu.length > 0
    ) {
      console.log("tesstedu is value", this.state.testedu);
      console.log("id for edu val", this.state.educationid);
      console.log("exp array", this.state.education);
      var modalediteducation = (
        <div>
          <div>
            {/* <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#basicExampleModalExperience">
     edit Personal Details
   </button>    */}

            <div
              class="modal fade modalStyle"
              id="basicExampleModalEducation"
              tabindex="-1"
              role="dialog"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div
                class="modal-dialog modal-lg modalStyle"
                role="document"
                width="750px"
                margin="auto"
              >
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">
                      Education
                    </h5>
                    <button
                      type="button"
                      class="close"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">
                    <div>
                      <label className="grey-text">School</label>
                      <input
                        label="school"
                        icon="fa-map-pin"
                        value={
                          this.state.education[this.state.educationid].school
                        }
                        id="school"
                        group
                        type="text"
                        validate
                        error="wrong"
                        success="right"
                        onChange={this.handlefieldchangeseducation}
                        className="form-input form-control"
                      />
                    </div>
                    <div>
                      <label className="grey-text">Degree</label>
                      <input
                        label="degree"
                        icon="fa-map-pin"
                        group
                        value={
                          this.state.education[this.state.educationid].degree
                        }
                        type="text"
                        id="degree"
                        validate
                        error="wrong"
                        success="right"
                        onChange={this.handlefieldchangeseducation}
                        className="form-input form-control"
                      />
                    </div>
                    <div>
                      <label className="grey-text">From Year</label>
                      <input
                        label="fromyear"
                        icon="fa-map-pin"
                        group
                        value={
                          this.state.education[this.state.educationid].fromyear
                        }
                        type="date"
                        id="fromyear"
                        validate
                        error="wrong"
                        success="right"
                        onChange={this.handlefieldchangeseducation}
                        className="form-input form-control"
                      />
                    </div>
                    <div>
                      <label className="grey-text">To Year</label>
                      <input
                        label="toyear"
                        icon="fa-map-pin"
                        group
                        value={
                          this.state.education[this.state.educationid].toyear
                        }
                        type="date"
                        id="toyear"
                        validate
                        error="wrong"
                        success="right"
                        onChange={this.handlefieldchangeseducation}
                        className="form-input form-control"
                      />
                    </div>
                  </div>
                  <div class="modal-footer">
                    <button
                      type="button"
                      class="profile-btn btn btn-secondary"
                      data-dismiss="modal"
                      onClick={this.cancelediteducationchanges}
                    >
                      Close
                    </button>
                    <button
                      type="button"
                      class="profile-btn btn btn-primary"
                      onClick={this.saveediteducationchanges}
                    >
                      Save changes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    //education section end

    //**************************************************************************** */

    //skills section for render start

    //iterate to display skills
    let skillsvar = this.state.skills.map(skillvalues => {
      return (
        <div>
          <h5>{skillvalues}</h5>
          <hr />
        </div>
      );
    });

    var modalskills = (
      <div>
        <button
          type="button"
          class="profile-btn btn btn-primary"
          data-toggle="modal"
          data-target="#basicExampleModalskills"
        >
          Add skills
        </button>

        <div
          class="modal fade modalStyle"
          id="basicExampleModalskills"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div
            class="modal-dialog modal-lg modalStyle"
            role="document"
            width="750px"
            margin="auto"
          >
            <div class="modal-content">
              <div class="modal-header">
                <h4 class="modal-title" id="exampleModalLabel">
                  Skills and Endorsement
                </h4>
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                {/*code to iterate over the string of skills again*/}
                <div>
                  <label className="grey-text">Skills</label>
                  <textarea
                    label="fname"
                    icon="fa-map-pin"
                    value={this.state.skillstr}
                    group
                    type="text"
                    id="skillstr"
                    validate
                    error="wrong"
                    success="right"
                    onChange={this.handlefieldchanges}
                    className="form-control form-input"
                  />
                </div>
                <div className="mt-3">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    data-dismiss="modal"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    class="btn btn-primary ml-3"
                    onClick={this.saveskillschanges}
                  >
                    Save changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );

    return (
      <div>
        {redirectVar}
        <Header />

        <div className="profile-total-content-container">
          <div className="pt-5">
            <div className="col-9 pl-0 pr-0 ml-5 mb-5 border bg-white">
              <div className="cover-image-container">
                <img
                  src="https://wallpapercave.com/wp/0557mer.jpg"
                  alt="cover-img"
                />
              </div>
              <div className="profile-img-container ml-4">
                <img className="profile-img" src={this.state.profileImage} />
              </div>

              <div className="pull-down-content ml-4">
                <p className="profileDescription">
                  <h2>
                    {this.state.fname1}&nbsp;{this.state.lname1}
                  </h2>
                </p>
                <p className="profileDescription1">
                  <h4>{this.state.headline1}</h4>
                </p>
                <p className="profileDescription1">
                  <h6>{this.state.company1}</h6>
                </p>

                <p className="">
                  <h6>{this.state.city1}</h6>
                </p>
                <p className="">
                  <h6>{this.state.stateval1}</h6>
                </p>
                <p className="">
                  <h6>{this.state.zipcode1}</h6>
                </p>
                <p className="">
                  <h5>{this.state.aboutMe1}</h5>
                </p>
                <p className="">{modalpersonaldetails}</p>
              </div>
            </div>
            <div className="col-3" />
            <div className="col-9 ml-5 mb-5 border bg-white">
              <div>
                <h3 className="mt-3 ml-3">Experience</h3>
              </div>
              <div className="col-lg-9">
                <div>
                  <div className="job-result-data p-3 mt-2 mb-2 row">
                    <span className="col-lg-9">
                      <div>{modaladdexperience}</div>
                      <div>{experiencevar}</div>
                      <div>{modaleditexperience}</div>
                      <div className="mt-3">
                        <button
                          type="button"
                          class="profile-btn btn btn-primary"
                          data-toggle="modal"
                          data-target="#basicExampleModalExperienceADD"
                          onClick={this.handleaddexperiencemodal}
                        >
                          Add Experience
                        </button>
                      </div>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-3" />
            <div className="col-9 ml-5 mb-5 border bg-white">
              <h3 className="mt-3">Education</h3>
              <p className="" />
              <div className="ml-4 mt-5  col-lg-9">
                <div>
                  <div className="job-result-data p-3 mt-2 mb-2 row">
                    <span className="col-lg-9">
                      <div>{modaladdeducation}</div>
                      <div>{educationvar}</div>
                      <div>{modalediteducation}</div>
                      <div className="mt-3">{addeducationmodalvar}</div>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-3" />
            <div className="col-9 ml-5 mb-5 mt-3 border bg-white ">
              <h3 className="mt-3">Skills</h3>

              <div className="ml-4 mt-5  col-lg-9">
                <div>
                  <div className="job-result-data p-3 mt-2 mb-2 row ">
                    <span className="col-lg-9">{skillsvar}</span>
                  </div>
                </div>
                <div className="mb-3">{modalskills}</div>
              </div>
            </div>
            <div className="col-3" />
          </div>
        </div>
        <div>
                  <button className="btn accept-btn ml-2" onClick={this.deleteAccount.bind(this)}>Delete Account</button>
                  </div> 
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loginStateStore: state.Login
});

export default connect(
  mapStateToProps,
  {}
)(Profile);
