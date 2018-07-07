import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { loadSearchResult } from '../../redux/actions/backend';

export default (Component) => {
  class Wrapped extends React.Component {
  static propTypes = {
    album: PropTypes.object,
    clearErrors: PropTypes.func,
    load: PropTypes.func,
    loadSearchResult: PropTypes.func,
  };

  componentDidMount() {
    this.props.load();
  }

  componentDidUpdate() {
    if (this.props.album.id && !this.albumSearch) {
      this.albumSearch = this.props.loadSearchResult(this.props.album.id);
    }
  }

  componentWillUnmount() {
    if (this.albumSearch) {
      this.albumSearch.unsubscribe();
    }
  }

  render() {
    return <Component {...this.props} />;
  }
  }

  return connect(() => ({}), dispatch => ({
    loadSearchResult: id => dispatch(loadSearchResult(id)),
  }))(Wrapped);
};
