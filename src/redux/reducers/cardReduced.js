import {ANNUL_CARD_PATH, SET_CARD_PATH} from "../actions/ActionType";

const initialState = {
    cardPath: []
}

export default function cardPathReducer(state = initialState, action){
    switch (action.type){
        case SET_CARD_PATH:
            return {
                cardPath: [...state.cardPath, action.payload]
            }
        case ANNUL_CARD_PATH:
            return {
                cardPath: []
            }
        default:
            return state
    }
}