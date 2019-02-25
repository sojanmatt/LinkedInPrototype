import {AUTH_POSTJOB} from '../actions/jobPostingDetailsAction';


//Reducer listening to action types

export default function(state = {}, action){
    switch(action.type){
        case AUTH_POSTJOB:
            console.log('Inside Reducer AUTH_POSTJOB', action.payload);
            return{
                ...state,
                result: action.payload
            }
        default:
            return state;
    }
}