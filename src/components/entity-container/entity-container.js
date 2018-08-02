import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { loadSearchResult } from 'state/actions/backend';
import { clearErrors } from 'state/errors';

export default (Component, mainId) => {
  class Wrapped extends React.Component {
    static propTypes = {
      album: PropTypes.object,
      clearErrors: PropTypes.func,
      load: PropTypes.func,
      loadSearchResult: PropTypes.func,
    };

    componentDidMount() {
      this.callLoad();
    }

    callLoad() {
      this.props.clearErrors();
      this.props.load();
    }

    componentDidUpdate(prev) {
      if (prev[mainId] !== this.props[mainId] && !!this.props[mainId]) {
        this.stopSearch();
        this.callLoad();
      }
      if (this.props.album.id && !this.albumSearch) {
        this.albumSearch = this.props.loadSearchResult(this.props.album.id);
      }
    }

    componentWillUnmount() {
      this.stopSearch();
    }

    stopSearch() {
      if (this.albumSearch) {
        this.albumSearch.unsubscribe();
        this.albumSearch = null;
      }
    }

    render() {
      return <Component {...this.props} />;
    }
  }

  return connect(() => ({}), dispatch => ({
    clearErrors: () => dispatch(clearErrors()),
    loadSearchResult: id => dispatch(loadSearchResult(id)),
  }))(Wrapped);
};
