export const SEND_MESSAGE = "SEND_MESSAGE";

//target action

export function saveSearchFieldToStore(data){
    return function(dispatch){
        console.log('Inside send message action');
        dispatch({
            type: SEND_MESSAGE,
            payload: data
        });        
    }
}