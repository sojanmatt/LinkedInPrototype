export const SAVE_PROFILE_DETAILS_TO_STORE = "SAVE_PROFILE_DETAILS_TO_STORE";

//target action

export function saveUserProfiletoStore(data){
    return function(dispatch){
        console.log('Inside saveprofilrDetailsToStore action');
        dispatch({
            type: SAVE_PROFILE_DETAILS_TO_STORE,
            payload: data
        });        
    }
}