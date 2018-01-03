import * as assert from "assert";
import { createStore } from "../src/redux";
import { todos } from "./helpers/reducers";

describe("Initial state", () => {
    it("Initial state of todos should be an empty array", () => {
        const store = createStore(todos);
        const init = store.getState();
        assert.deepEqual(init, []);
    });
});
