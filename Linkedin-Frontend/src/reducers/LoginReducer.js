import {AUTH_LOGIN} from '../actions/LoginAction';


//Reducer listening to action types
var intialState = {
    isAuthenticated : false
}

export default function(state = intialState, action){
    switch(action.type){
        case AUTH_LOGIN:
            console.log('Inside Reducer AUTH_LOGIN', action.payload);
            return{
                ...state,
                isAuthenticated: action.payload.responseFlag,
                result: action.payload
            }
        default:
            return state;
    }
}