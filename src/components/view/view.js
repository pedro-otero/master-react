import React from 'react';
import PropTypes from 'prop-types';

import LoadingCircle from 'components/LoadingCircle';

class View extends React.Component {
  render() {
    const {
      loading,
      loadingMessage,
      failed,
      failedMessage,
      children,
    } = this.props;
    if (loading) {
      return <LoadingCircle message={loadingMessage} />;
    }
    if (failed) {
      return <div>
        <i className="em em--1"></i>
        <h1>{failedMessage}</h1>
      </div>;
    }
    return children;
  }
}

View.propTypes = {
  children: PropTypes.node,
  failed: PropTypes.bool,
  failedMessage: PropTypes.string,
  isThereMore: PropTypes.func,
  loadDetails: PropTypes.func,
  loadHeader: PropTypes.func,
  loading: PropTypes.bool,
  loadingMessage: PropTypes.string,
};

export default View;
