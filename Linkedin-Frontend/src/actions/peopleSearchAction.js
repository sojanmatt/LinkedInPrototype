export const SAVE_SEARCHPEOPLE_FIELDS_TO_STORE = "SAVE_SEARCHPEOPLE_FIELDS_TO_STORE";

//target action

export function saveSearchPeopleFieldToStore(data){
    return function(dispatch){
        console.log('Inside saveSearchFieldToStore action');
        dispatch({
            type: SAVE_SEARCHPEOPLE_FIELDS_TO_STORE,
            payload: data
        });        
    }
}