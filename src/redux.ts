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

    // get the initial state
    dispatch({
        type: "@@INIT"
    });

    return {
        getState,
        subscribe,
        dispatch
    };
}

export function combineReducers(reducers) {
    const combinedReducers = {};

    Object.keys(reducers).forEach(key => {
        if (typeof reducers[key] === "function") {
            combinedReducers[key] = reducers[key];
        }
    });

    return function(state = {}, action: IAction) {
        const nextState = {};
        let hasChanged = false;
        Object.keys(combinedReducers).forEach(key => {
            const reducer = combinedReducers[key];
            const previousKeyState = state[key];
            const nextKeyState = reducer(previousKeyState, action);

            if (typeof nextKeyState === "undefined") {
                throw new Error("unexpect new state");
            }

            nextState[key] = nextKeyState;
            hasChanged = hasChanged || nextKeyState !== previousKeyState;
        });

        return hasChanged ? nextState : state;
    };
}

export function applyMiddleware(...middlewares) {
    // TODO
}
