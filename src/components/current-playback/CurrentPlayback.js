import * as React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import './CurrentPlayback.css';
import EmptyPlayback from '../empty-playback/empty-playback';

export class CurrentPlayback extends React.Component {
  render() {
    const { id } = this.props;
    return (
      <div>
        {!id && <EmptyPlayback />}
        {id && <Redirect
            to={`/track/${id}`}
            push />}
      </div>
    );
  }
}

const mapStateToProps = ({ playbackInfo }) => ({
  id: playbackInfo && playbackInfo.item ? playbackInfo.item.id : null,
});

CurrentPlayback.propTypes = {
  id: PropTypes.string,
};

export default connect(mapStateToProps)(CurrentPlayback);
