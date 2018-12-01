import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';

import Link from 'components/Link';
import Image from 'components/Image';
import PlaybackInfo from 'components/PlaybackInfo';
import { loadPlaybackInfo } from 'state/playbackInfo';

const TRACKS = '/user/tracks';
const ALBUMS = '/user/albums';

const Header = styled.div`
  background-color: rgba(200, 200, 200, 0.5);
  display: flex;
  padding: 1em;
`;

const NameBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding-left: 1em;
`;

const Name = styled.span`font-weight: bold;`;
const UserId = styled.span`font-size: smaller;`;

const Option = styled.div`
  width: 100%;
  padding: 1em;
  box-sizing: border-box;
  font-weight: bolder;
  
  :hover {
    background-color: rgb(49, 205, 104);
  }
`;

const MenuFlexContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const PlaybackInfoContainer = styled.div`
`;

const Options = styled.div`
  flex: 1;
`;

const OptionLink = ({ children, ...props }) => (
  <Link {...props}>
    <Option>{children}</Option>
  </Link>
);

OptionLink.propTypes = {
  children: PropTypes.node,
};

const PLAYBACK_INFO_LOAD_INTERVAL = 5000;

export class Menu extends React.Component {
  componentDidUpdate({ isVisible: wasVisible }) {
    const { isVisible } = this.props;
    if (wasVisible && !isVisible) {
      this.unsubscribeToPlayback();
    } else if (!wasVisible && isVisible) {
      this.subscribeToPlayback();
    }
  }

  subscribeToPlayback = () => {
    this.props.loadPlaybackInfo();
    this.playbackInfoTimer = setInterval(this.props.loadPlaybackInfo, PLAYBACK_INFO_LOAD_INTERVAL);
  };

  unsubscribeToPlayback = () => {
    clearInterval(this.playbackInfoTimer);
    this.playbackInfoTimer = null;
  };

  render() {
    const {
      avatar, name, userId, playback,
    } = this.props;
    return (
      <MenuFlexContainer>
        <Header>
          <Image rounded size='4em' src={avatar} />
          <NameBox>
            <Name>{name}</Name>
            <UserId>@{userId}</UserId>
          </NameBox>
        </Header>
        <Options>
          <OptionLink to={TRACKS}>Tracks</OptionLink>
          <OptionLink to={ALBUMS}>Albums</OptionLink>
        </Options>
        {playback.id && <PlaybackInfoContainer>
          <PlaybackInfo {...playback} />
        </PlaybackInfoContainer>}
      </MenuFlexContainer>
    );
  }
}

Menu.propTypes = {
  avatar: PropTypes.string,
  isVisible: PropTypes.bool,
  loadPlaybackInfo: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  name: PropTypes.string,
  playback: PropTypes.object,
  userId: PropTypes.string,
};

const mapStateToProps = ({
  user: {
    profile: {
      loading, avatar, name, userId,
    },
    playbackInfo,
  },
}) => {
  const baseProps = {
    loading, avatar, name, userId,
  };
  if (playbackInfo) {
    const {
      artist,
      name: itemName,
      itemId,
      image,
    } = playbackInfo;
    Object.assign(baseProps, {
      playback: {
        image, artist, name: itemName, id: itemId,
      },
    });
  }
  return baseProps;
};

const mapDispatchToProps = dispatch => ({
  loadPlaybackInfo: () => dispatch(loadPlaybackInfo()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
