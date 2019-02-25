export const SAVE_SEARCH_FIELDS_TO_STORE = "SAVE_SEARCH_FIELDS_TO_STORE";

//target action

export function saveSearchFieldToStore(data){
    return function(dispatch){
        console.log('Inside saveSearchFieldToStore action');
        dispatch({
            type: SAVE_SEARCH_FIELDS_TO_STORE,
            payload: data
        });        
    }
}