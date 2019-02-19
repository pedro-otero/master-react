import React from 'react';
import PropTypes from 'prop-types';

import LoadingCircle from 'components/LoadingCircle';

export class View extends React.Component {
  static propTypes = {
    canStartLoadingDetails: PropTypes.func,
    children: PropTypes.node,
    clearErrors: PropTypes.func,
    failed: PropTypes.bool,
    failedMessage: PropTypes.string,
    isThereMore: PropTypes.func,
    load: PropTypes.func,
    loadDetails: PropTypes.func,
    loadHeader: PropTypes.func,
    loadSearchResult: PropTypes.func,
    loading: PropTypes.bool,
    loadingMessage: PropTypes.string,
    shouldStopSearching: PropTypes.func,
  };

  componentDidMount() {
    this.props.clearErrors();
    this.props.load();
    if (this.props.canStartLoadingDetails()) {
      this.program();
    }
  }

  componentDidUpdate(prev) {
    if (!this.albumSearch && this.props.canStartLoadingDetails()) {
      this.program();
    }
    if (this.props.shouldStopSearching()) {
      this.stopSearch();
    }
  }

  componentWillUnmount() {
    this.stopSearch();
  }

  program() {
    this.search();
    this.albumSearch = setInterval(this.search.bind(this), 1000);
  }

  search() {
    this.props.loadSearchResult();
  }

  stopSearch() {
    clearInterval(this.albumSearch);
    this.albumSearch = null;
  }

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

export default View;
