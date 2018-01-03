import {
    ADD_TODO
    // DISPATCH_IN_MIDDLE,
    // GET_STATE_IN_MIDDLE,
    // SUBSCRIBE_IN_MIDDLE,
    // UNSUBSCRIBE_IN_MIDDLE,
    // THROW_ERROR
} from "./actionTypes";

export function todos(state = [], action) {
    switch (action.type) {
        case ADD_TODO:
            return [
                ...state,
                {
                    id: Symbol(),
                    text: action.text
                }
            ];

        default:
            return state;
    }
}
