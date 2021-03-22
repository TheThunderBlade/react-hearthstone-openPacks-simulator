import {ADD_POINTS, ZERO_POINTS} from '../actions/ActionType'

const initialState = {
    points: 0
}

export default function PointCounter(state = initialState, action){
    switch(action.type) {
        case ADD_POINTS: 
            return{
                points: state.points + 10
            }
        case ZERO_POINTS:
            return {
                points: 0
            }

        default: return state
    }
}

