import axios from "axios";
export const AUTH_LOGIN = "AUTH_LOGIN";

const ROOT_URL = "http://localhost:3001";

export function login(data){
    return function(dispatch){
        axios.defaults.withCredentials = true;

        axios.post('http://localhost:3001/login', data)
        .then(response => { 
            var data = {responseFlag: ""}
            console.log("response",response.data);
            var data = {responseFlag: ""}
            if(response.status==200) {
                data.FName = response.data.value.FName,
                data.LName = response.data.value.LName,
                data.email = response.data.value.email,
                data.accountType = response.data.value.accountType,
                data.responseFlag = "true";
                dispatch({
                    type: AUTH_LOGIN,
                    payload: data
                });
            }        
            })
            .catch(error => {
                data.responseFlag = "";
                dispatch({
                type: AUTH_LOGIN,
                payload: data
            })
        });
    }
}

