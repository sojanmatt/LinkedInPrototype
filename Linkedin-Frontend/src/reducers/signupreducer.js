import * as UserConstants from "../Constants/UserConstants";

const initialState = {
  isApplicantSignedUp: false,
  isRecruiterSignedUp: false,
  isinvalid: false,
  username: ""
};

/*

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case UserConstants.APPLICANT_SIGNUP_SUCCESS:
      return {
        ...state,
        isApplicantSignedUp: true,
        isRecruiterSignedUp: false
      };
    case UserConstants.RECRUITER_SIGNUP_SUCCESS:
      return {
        ...state,
        isRecruiterSignedUp: true,
        isApplicantSignedUp: false,
        username: action.message
      };
  }
  return state;
};
export default reducer;
*/

export default function(state = initialState, action) {
  switch (action.type) {
    case UserConstants.APPLICANT_SIGNUP_SUCCESS:
      return {
        ...state,
        isApplicantSignedUp: true,
        isRecruiterSignedUp: false,
        isinvalid: false,
        username: action.message
      };
    case UserConstants.RECRUITER_SIGNUP_SUCCESS:
      return {
        ...state,
        isRecruiterSignedUp: true,
        isApplicantSignedUp: false,
        isinvalid: false,
        username: action.message
      };
    case UserConstants.SIGNUP_FAILURE:
      return {
        ...state,
        isRecruiterSignedUp: false,
        isApplicantSignedUp: false,
        isinvalid: true
      };
  }
  return state;
}
