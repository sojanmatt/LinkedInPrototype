import axios from "axios";
export const AUTH_POSTJOB = "AUTH_POSTJOB";

const ROOT_URL = "http://localhost:3001";

export function postedJobs(data){
    return function(dispatch){
        axios.defaults.withCredentials = true;
        console.log("true",data);
        dispatch({
            type: AUTH_POSTJOB,
            payload: data
        }); 
    }
}

