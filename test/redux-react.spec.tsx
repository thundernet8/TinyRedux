import "jsdom-global/register";
import * as React from "react";
import * as PropTypes from "prop-types";
import { configure, mount, shallow } from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import { expect } from "chai";
import * as assert from "assert";
import App from "./helpers/App";
import { createStore, combineReducers } from "../src/redux";
import { todos, user } from "./helpers/reducers";
import { ADD_TODO, LOGIN } from "./helpers/actionTypes";
import { Provider } from "../src/redux-react";

configure({ adapter: new Adapter() });

describe("Provider for component", () => {
    it("should render data from store", () => {
        const store = createStore(
            combineReducers({
                todos,
                user
            })
        );

        const getWrapper = () =>
            shallow(
                <Provider store={store}>
                    <App />
                </Provider>,
                {
                    context: {
                        store
                    },
                    childContextTypes: {
                        store: PropTypes.object
                    }
                }
            );

        const getMountWrapper = () =>
            mount(
                <Provider store={store}>
                    <App />
                </Provider>,
                {
                    context: {
                        store
                    },
                    childContextTypes: {
                        store: PropTypes.object
                    }
                }
            );

        assert(typeof getWrapper().props() !== undefined);
        assert(Object.keys(getMountWrapper().props()).indexOf("store") > -1);

        store.dispatch({
            type: LOGIN,
            payload: { name: "Joe" }
        });

        assert.equal(
            getMountWrapper()
                .find(".name")
                .text(),
            "Joe"
        );

        store.dispatch({
            type: ADD_TODO,
            payload: { text: "TODO1" }
        });

        expect(getMountWrapper().find("li")).to.have.length(1);

        expect(
            getMountWrapper()
                .find("li")
                .at(0)
                .text()
        ).to.equal("TODO1");
    });
});
