import axios from "axios";
import * as UserConstants from "../Constants/UserConstants";
var jwtDecode = require("jwt-decode");

export const userActions = {
  applicantsignup
};

function applicantsignup(data) {
  console.log("inside applicant signup action ");
  return dispatch => {
    axios.defaults.withCredentials = true;
    axios
      .post("http://localhost:3001/applicant/signup", data)
      .then(response => {
        console.log("xresponse is ", response.data);
        var decoded = jwtDecode(response.data);
        var tid = decoded.user.type;
        var username = decoded.user._id;
        console.log("signup token username", username);
        localStorage.setItem("userType", tid);
        localStorage.setItem("userId", username);

        dispatch(signupsuccess(response.data));
      })
      .catch(error => {
        // alert("Invalid Signup");
        console.log("error is", error);
        dispatch(signupfailure());
        throw error;
      });
  };
}
function signupsuccess(message) {
  return {
    type: UserConstants.APPLICANT_SIGNUP_SUCCESS,
    message: message
  };
}
function signupfailure() {
  return {
    type: UserConstants.SIGNUP_FAILURE
  };
}
