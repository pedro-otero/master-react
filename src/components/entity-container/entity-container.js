import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { clearErrors } from 'state/errors';
import { loadSearchResult } from 'state/actions/backend';

export function EntityContainer(Component, mainId) {
  return class Wrapped extends React.Component {
    static propTypes = {
      album: PropTypes.object,
      clearErrors: PropTypes.func,
      load: PropTypes.func,
      loadSearchResult: PropTypes.func,
    };

    componentDidMount() {
      this.callLoad();
      this.startSearch();
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
      this.startSearch();
    }

    startSearch() {
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
  };
}

const mapDispatchToProps = dispatch => ({
  clearErrors: () => dispatch(clearErrors()),
  loadSearchResult: id => dispatch(loadSearchResult(id)),
});

export default (Component, mainId) =>
  connect(() => ({}), mapDispatchToProps)(EntityContainer(Component, mainId));
