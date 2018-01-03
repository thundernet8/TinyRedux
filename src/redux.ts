export interface IAction {
    type: string;
    payload?: any;
    error?: string | Error;
}

export function createStore(reducer) {
    let currentState: any;
    let currentListeners: Function[] = [];

    function getState() {
        return currentState;
    }

    function subscribe(listener: Function) {
        currentListeners.push(listener);
    }

    function dispatch(action: IAction) {
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
