import * as React from "react";
import { connect } from "../../src/redux-react";
class App extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { user, todos } = this.props;
        return (React.createElement("div", null,
            React.createElement("h2", null, "TODOs"),
            React.createElement("ul", null, todos.map((todo, index) => {
                return React.createElement("li", { key: index }, todo.text);
            })),
            React.createElement("aside", null,
                React.createElement("h3", null, "User"),
                user && React.createElement("p", { className: "name" }, user.name))));
    }
}
const ConnectApp = connect(state => {
    return {
        user: state.user,
        todos: state.todos
    };
}, (state, dispatch) => {
    return {};
})(App);
export default ConnectApp;
