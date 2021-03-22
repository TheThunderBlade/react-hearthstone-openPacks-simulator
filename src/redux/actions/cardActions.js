import {SET_CARD_PATH, ANNUL_CARD_PATH} from "./ActionType";

export function setCardPath(cardPath) {
    return{
        type: SET_CARD_PATH,
        payload: cardPath
    }
}

export function annulCardPath() {
    return{
        type: ANNUL_CARD_PATH
    }
}