import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Image from 'components/Image';
import Link from 'components/Link';

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

const PlaybackInfo = ({
  id, image, name, artist,
}) => (
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

PlaybackInfo.propTypes = {
  artist: PropTypes.string,
  id: PropTypes.string,
  image: PropTypes.string,
  name: PropTypes.string,
};

export default PlaybackInfo;
