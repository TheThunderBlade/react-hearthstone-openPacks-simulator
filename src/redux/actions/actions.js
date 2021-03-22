import {ADD_POINTS, ZERO_POINTS} from './ActionType'

export function annulPoints() {
    return{
        type: ZERO_POINTS
    }
}

export function addPoints() {
    return {
        type: ADD_POINTS
    }
}