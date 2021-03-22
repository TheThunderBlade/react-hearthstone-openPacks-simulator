import {combineReducers} from 'redux'
import pointCounter from './reducers/PointCounter'
import authReducer from "./reducers/auth";
import cardPathReducer from "./reducers/cardReduced";

export default combineReducers({
    pointCounter,
    authReducer,
    cardPathReducer
})