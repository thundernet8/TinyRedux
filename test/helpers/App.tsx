import * as React from "react";
import { connect } from "../../src/redux-react";

interface AppProps {
    user: any;
    todos: any[];
}

interface AppState {}

class App extends React.Component<AppProps, AppState> {
    constructor(props) {
        super(props);
    }

    render() {
        const { user, todos } = this.props;
        return (
            <div>
                <h2>TODOs</h2>
                <ul>
                    {todos.map((todo, index) => {
                        return <li key={index}>{todo.text}</li>;
                    })}
                </ul>
                <aside>
                    <h3>User</h3>
                    {user && <p className="name">{user.name}</p>}
                </aside>
            </div>
        );
    }
}

const ConnectApp = connect(
    state => {
        return {
            user: state.user,
            todos: state.todos
        };
    },
    (_state, _dispatch) => {
        return {};
    }
)(App);

export default ConnectApp;
