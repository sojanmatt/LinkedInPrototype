import {SAVE_PROFILE_DETAILS_TO_STORE} from '../actions/profileResultsAction';

export default function(state = {}, action){
    switch(action.type){
        case SAVE_PROFILE_DETAILS_TO_STORE:
            console.log('SAVE_PROFILE_DETAILS_TO_STORE reducer');
            return {
                ...state,
                result : action.payload
            }
        default: 
            return state;
    }
}