import {AUTH_VIEWRESUME} from '../actions/viewApplicantResumeAction';


//Reducer listening to action types

export default function(state = {}, action){
    switch(action.type){
        case AUTH_VIEWRESUME:
            console.log('Inside Reducer AUTH_VIEWRESUME', action.payload);
            return{
                ...state,
                result: action.payload
            }
        default:
            return state;
    }
}