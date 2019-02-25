import {SAVE_SEARCHPEOPLE_FIELDS_TO_STORE} from '../actions/peopleSearchAction';

export default function(state = {}, action){
    switch(action.type){
        case SAVE_SEARCHPEOPLE_FIELDS_TO_STORE:
            console.log('SAVE_SEARCHPEOPLE_FIELDS_TO_STORE reducer');
            return {
                ...state,
                searchfieldresult : action.payload
            }
        default: 
            return state;
    }
}