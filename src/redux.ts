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

export function compose(...funcs) {
    if (funcs.length === 0) {
        return arg => arg;
    }

    if (funcs.length === 1) {
        return funcs[0];
    }

    return funcs.reduce((previous, current) => {
        return (...args) => previous(current(...args));
    });
}

export function applyMiddleware(...middlewares) {
    return createStore => (...args) => {
        const store = createStore(...args);

        const dispatch = compose(...middlewares.map(middleware => middleware(middlewareArgs)))(
            store.dispatch
        );

        const middlewareArgs = {
            getState: store.getState,
            dispatch
        };

        return {
            ...store,
            dispatch
        };
    };
}

export function bindActionsCreators(creators, dispatch) {
    let binding = {};
    Object.keys(creators).forEach(key => {
        const creator = creators[key];
        binding[key] = (...args) => dispatch(creator(...args));
    });

    return binding;
}
