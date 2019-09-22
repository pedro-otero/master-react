import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Image from 'components/Image';
import Link from 'components/Link';
import GlobalAppContext from '../../context';

const PlaybackInfoMain = styled.div`
  border-top: 1px solid grey;
  display: flex;
`;

const SongInfo = styled.div`
  padding-left: 0.2em;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const overflowPrevention = `
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 15em;
`;

const TrackName = styled.strong`${overflowPrevention}`;
const Artist = styled.small`${overflowPrevention}`;

const PLAYBACK_INFO_LOAD_INTERVAL = 5000;

class PlaybackInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    if (this.props.isVisible) {
      this.subscribeToPlayback();
    }
  }

  componentDidUpdate({ isVisible: wasVisible }) {
    const { isVisible } = this.props;
    if (wasVisible && !isVisible) {
      this.unsubscribeToPlayback();
    } else if (!wasVisible && isVisible) {
      this.subscribeToPlayback();
    }
  }

  componentWillUnmount() {
    this.unsubscribeToPlayback();
  }

  subscribeToPlayback = () => {
    this.loadPlaybackInfo();
    this.playbackInfoTimer = setInterval(this.loadPlaybackInfo, PLAYBACK_INFO_LOAD_INTERVAL);
  };

  unsubscribeToPlayback = () => {
    clearInterval(this.playbackInfoTimer);
    this.playbackInfoTimer = null;
  };

  loadPlaybackInfo = () => {
    this.context.spotifyApi.getMyCurrentPlaybackState().then((response) => {
      const data = response.body;
      if (data && data.item) {
        const {
          id, name, artists: [{ name: artist }], album: { images: [{ url: image }] },
        } = data.item;
        this.setState({
          id, name, artist, image,
        });
      } else {
        this.setState({});
      }
    });
  };

  render() {
    const {
      id, name, artist, image,
    } = this.state;
    if (!id) return null;
    return (
      <Link to={`/track/${id}`}>
        <PlaybackInfoMain>
          <Image src={image} size="3em" />
          <SongInfo>
            <TrackName>{name}</TrackName>
            <Artist>{artist}</Artist>
          </SongInfo>
        </PlaybackInfoMain>
      </Link>
    );
  }
}

PlaybackInfo.propTypes = {
  isVisible: PropTypes.bool,
};

PlaybackInfo.contextType = GlobalAppContext;

export default PlaybackInfo;
