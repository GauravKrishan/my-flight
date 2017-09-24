import {combineReducers} from 'redux';
import actionsReducer from './actionsReducer';

//Combine all reduces.
export default combineReducers({
    app: actionsReducer
})