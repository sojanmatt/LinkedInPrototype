import {SAVE_JOB_DETAILS_TO_STORE} from '../actions/jobResultsAction';

export default function(state = {}, action){
    switch(action.type){
        case SAVE_JOB_DETAILS_TO_STORE:
            console.log('SAVE_JOB_DETAILS_TO_STORE reducer');
            return {
                ...state,
                result : action.payload
            }
        default: 
            return state;
    }
}