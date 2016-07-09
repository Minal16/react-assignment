import React from 'react';

const connect = (state$, selector = (state) => state) => (WrappedComponent) =>
    class Connect extends React.Component {
      componentWillMount() {
        this.subscription = state$.map(selector).subscribe(::this.setState);
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

export default connect;
