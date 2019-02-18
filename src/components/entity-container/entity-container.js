import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { clearErrors } from 'state/errors';
import { loadSearchResult } from 'state/actions/backend';

export function EntityContainer(Component, canStartSearching) {
  return class Wrapped extends React.Component {
    static propTypes = {
      album: PropTypes.object,
      clearErrors: PropTypes.func,
      load: PropTypes.func,
      loadSearchResult: PropTypes.func,
    };

    componentDidMount() {
      this.props.clearErrors();
      this.props.load();
      if (canStartSearching(this.props)) {
        this.program();
      }
    }

    componentDidUpdate(prev) {
      if (!canStartSearching(prev) && canStartSearching(this.props)) {
        this.program();
      }
      if (this.props.progress === 100) {
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
      this.props.loadSearchResult(this.props.album.id);
    }

    stopSearch() {
      clearInterval(this.albumSearch);
      this.albumSearch = null;
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

export default (Component, canStartSearching) =>
  connect(() => ({}), mapDispatchToProps)(EntityContainer(Component, canStartSearching));
