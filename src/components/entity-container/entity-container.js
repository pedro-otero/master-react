import React from 'react';
import PropTypes from 'prop-types';

export default Component => class Wrapped extends React.Component {
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
};
