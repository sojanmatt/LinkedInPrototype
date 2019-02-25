export const SAVE_JOB_DETAILS_TO_STORE = "SAVE_JOB_DETAILS_TO_STORE";

//target action

export function saveJobDetailsToStore(data){
    return function(dispatch){
        console.log('Inside saveJobDetailsToStore action');
        dispatch({
            type: SAVE_JOB_DETAILS_TO_STORE,
            payload: data
        });        
    }
}