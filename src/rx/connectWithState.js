import React, { PropTypes } from 'react';

const connectWithState = (selector = (state) => state) => (WrappedComponent) =>
    class ConnectWithState extends React.Component {

      static contextTypes = {
        state$: PropTypes.object,
      };

      constructor(props, context) {
        super(props, context);
        this.state$ = context.state$;
        // console.log('state from context: ', context.state$);
        // console.log('statestate: ', this.state$);
      }

      componentWillMount() {
        // console.log('willmount: ', this.state$);
        // console.log('SELECTOR: ', selector);
        // this.subscription = this.state$.map(selector).subscribe(::this.setState);
        this.subscription = this.state$.map(selector).subscribe( // TODO: maybe add distinct?
          (data) => this.setState(data),
          (err) => console.error('ERR: ', err)
        );
        // this.setState('ahoj');
        // console.log('STATE IN WRAPPER: ', this.state);
      }

      componentWillUnmount() {
        this.subscription.unsubscribe();
      }

      render() {
        return (
          <WrappedComponent {...this.state} {...this.props} />
        );
      }
    };

export default connectWithState;
