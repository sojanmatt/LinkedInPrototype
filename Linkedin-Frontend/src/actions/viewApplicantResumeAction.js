import axios from "axios";
export const AUTH_VIEWRESUME = "AUTH_VIEWRESUME";

const ROOT_URL = "http://localhost:3001";

export function viewApplicantResume(data){
    return function(dispatch){
        axios.defaults.withCredentials = true;
        console.log("true",data);
        dispatch({
            type: AUTH_VIEWRESUME,
            payload: data
        }); 
    }
}

