export function createStore(reducer) {
    let currentState = {};
    let currentListeners = [];
    function getState() {
        return currentState;
    }
    function subscribe(listener) {
        currentListeners.push(listener);
    }
    function dispatch(action) {
        currentState = reducer(currentState, action);
        currentListeners.forEach(listener => listener());
        return action;
    }
    function combineReducers(reducers) {
        // TODO
    }
    // get the initial state
    dispatch({
        type: "@@INIT"
    });
    return {
        getState,
        subscribe,
        dispatch,
        combineReducers
    };
}
export function applyMiddleware(...middlewares) {
    // TODO
}
