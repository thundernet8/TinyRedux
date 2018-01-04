import { ADD_TODO, LOGIN
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
                    text: action.payload.text
                }
            ];
        default:
            return state;
    }
}
export function user(state = {}, action) {
    switch (action.type) {
        case LOGIN:
            return {
                name: action.payload.name
            };
        default:
            return state;
    }
}
