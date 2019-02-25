import {SAVE_SEARCH_FIELDS_TO_STORE} from '../actions/jobSearchAction';

export default function(state = {}, action){
    switch(action.type){
        case SAVE_SEARCH_FIELDS_TO_STORE:
            console.log('SAVE_SEARCH_FIELDS_TO_STORE reducer');
            return {
                ...state,
                searchfieldresult : action.payload
            }
        default: 
            return state;
    }
}