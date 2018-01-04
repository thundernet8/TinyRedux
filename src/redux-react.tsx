import * as React from "react";
import * as PropTypes from "prop-types";
import { bindActionsCreators } from "./redux";

// interface ConnectComponentProps {}

interface ConnectComponentState {
    props: any;
}

export const connect = (mapStateToProps = state => state, mapDispatchToProps = {}) => (
    WrapComponent: React.ComponentClass
) => {
    return class ConnectComponent extends React.Component<any, ConnectComponentState> {
        static contextTypes = {
            store: PropTypes.object
        };

        constructor(props, context) {
            super(props, context);
            this.state = {
                props: this.getProps(props)
            };
        }

        componentDidMount() {
            const { store } = this.context;
            store.subscribe(this.update);
            this.update();
        }

        getProps = (props?) => {
            const { store } = this.context;
            const stateProps = mapStateToProps(store.getState());
            const dispatchProps = bindActionsCreators(mapDispatchToProps, store.dispatch);
            return {
                ...(props || this.state.props),
                ...stateProps,
                ...dispatchProps
            };
        };

        update = () => {
            this.setState({
                props: this.getProps()
            });
        };

        render() {
            return <WrapComponent {...this.state.props} />;
        }
    };
};

interface ProviderProps {
    store: object;
}

export class Provider extends React.Component<ProviderProps> {
    static childContextTypes = {
        store: PropTypes.object
    };

    constructor(props, context) {
        super(props, context);
    }

    getChildContext() {
        return {
            store: this.props.store
        };
    }

    render() {
        return this.props.children;
    }
}
