import React, { PropTypes } from 'react';

const connectWithState = (selector = (state) => state) => (WrappedComponent) =>
    class ConnectWithState extends React.Component {

      static contextTypes = {
        state$: PropTypes.object,
      };

      constructor(props, context) {
        super(props, context);
        // console.log('CONTEXT: ', context);
        this.state$ = context.state$;
      }

      componentWillMount() {
        this.subscription = this.state$.map(selector).subscribe(::this.setState);
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
