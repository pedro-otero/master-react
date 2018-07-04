import * as React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import EmptyPlayback from '../empty-playback/empty-playback';
import LoadingCircle from '../loading-circle/loading-circle';

export class CurrentPlayback extends React.Component {
  render() {
    const { id, loading } = this.props;
    return (
      <div>
        {loading && <LoadingCircle message="Coming..." />}
        {(!id && !loading) && <EmptyPlayback />}
        {id && <Redirect
            to={`/track/${id}`}
            push />}
      </div>
    );
  }
}

const mapStateToProps = ({ user: { playbackInfo } }) => ({
  id: playbackInfo && playbackInfo.item ? playbackInfo.item.id : null,
  loading: playbackInfo === 'LOADING',
});

CurrentPlayback.propTypes = {
  id: PropTypes.string,
  loading: PropTypes.bool,
};

export default connect(mapStateToProps)(CurrentPlayback);
