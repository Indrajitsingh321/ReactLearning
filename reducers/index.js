import {GET_TAG} from '../actions';
import { combineReducers } from 'redux';

function dataStore(state = [],action){
    switch(action.type){
        case GET_TAG:
        
     //   let tag = state.tag.mainTag !== action.id ? action.id : state.tag.mainTag;
        return action.id;
        default:
        return state;
    }
}

const rootReducer = combineReducers({
    dataStore
})

export default rootReducer;