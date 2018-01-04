import * as React from "react";
import * as PropTypes from "prop-types";
import { bindActionsCreators } from "./redux";
export const connect = (mapStateToProps = state => state, mapDispatchToProps = {}) => (WrapComponent) => {
    return _a = class ConnectComponent extends React.Component {
            constructor(props, context) {
                super(props, context);
                this.getProps = (props) => {
                    const { store } = this.context;
                    const stateProps = mapStateToProps(store.getState());
                    const dispatchProps = bindActionsCreators(mapDispatchToProps, store.dispatch);
                    return Object.assign({}, (props || this.state.props), stateProps, dispatchProps);
                };
                this.update = () => {
                    this.setState({
                        props: this.getProps()
                    });
                };
                this.state = {
                    props: this.getProps(props)
                };
            }
            componentDidMount() {
                const { store } = this.context;
                store.subscribe(this.update);
                this.update();
            }
            render() {
                return React.createElement(WrapComponent, Object.assign({}, this.state.props));
            }
        },
        _a.contextTypes = {
            store: PropTypes.object
        },
        _a;
    var _a;
};
export class Provider extends React.Component {
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
Provider.childContextTypes = {
    store: PropTypes.object
};
