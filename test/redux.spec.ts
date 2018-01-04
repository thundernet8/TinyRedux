import * as assert from "assert";
import { createStore, combineReducers } from "../src/redux";
import { todos, user } from "./helpers/reducers";
// import { ADD_TODO, LOGIN } from "./helpers/actionTypes";

describe("Initial state", () => {
    it("Initial state of todos should be an empty array", () => {
        const store = createStore(todos);
        const init = store.getState();
        assert.deepEqual(init, []);
    });
});

describe("Combine reducers", () => {
    it("Should combine two reducers and got each's state", () => {
        const store = createStore(
            combineReducers({
                todos,
                user
            })
        );
        const state = store.getState();

        assert.deepEqual(state.todos, []);
        assert.deepEqual(state.user, {});
    });
});
