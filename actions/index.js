export const GET_TAG = 'GET_TAG';

export function getTag(id){
    const action = {
        type: GET_TAG,
        id
    }
    return action;
}