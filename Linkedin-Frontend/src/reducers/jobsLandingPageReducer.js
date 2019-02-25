import {SAVE_SAVED_JOBS_TO_STORE, SAVE_APPLIED_JOBS_TO_STORE} from '../actions/jobsLandingPageAction';


export default function(state = {}, action){
    switch(action.type){
        case SAVE_SAVED_JOBS_TO_STORE:
            console.log('SAVE_SAVED_JOBS_TO_STORE reducer');
            return {
                ...state,
                result : action.payload
            }
        case SAVE_APPLIED_JOBS_TO_STORE:
            console.log('SAVE_APPLIED_JOBS_TO_STORE reducer');
            return {
                ...state,
                appliedJobs : action.payload
            }
        default: 
            return state;
    }
}