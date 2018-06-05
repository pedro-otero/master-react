import * as React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import './CurrentPlayback.css';
import EmptyPlayback from '../components/empty-playback';
import { loadPlaybackInfo } from '../redux/actions/spotify';

export class CurrentPlayback extends React.Component {
  render() {
    const { track } = this.props;
    return (
      <div>
        {!track && <EmptyPlayback />}
        {track && <Redirect
            to={`/track/${track.id}`}
            push />}
      </div>
    );
  }
}

const mapStateToProps = ({ playbackInfo }) => ({
  track: playbackInfo && playbackInfo.item ? playbackInfo.item : null,
});

const mapDispatchToProps = dispatch => ({
  loadPlaybackInfo: () => dispatch(loadPlaybackInfo()),
});

CurrentPlayback.propTypes = {
  track: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(CurrentPlayback);
