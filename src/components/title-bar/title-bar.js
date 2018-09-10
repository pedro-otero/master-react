import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Image from 'components/Image';
import { loadPlaybackInfo } from 'state/playbackInfo';
import { addError, clearErrors } from 'state/errors';

const BORDER_COLOR = 'rgba(128, 128, 128, 0.2)';

const Row = styled.div`
  display: flex;
  position: sticky;
  z-index: 500;
  top: 0;
  background-color: rgba(0, 0, 0, 0.5);
  line-height: 3em;
  vertical-align: middle;
`;

const AvatarTopMargin = styled.div`
  margin-top: 0.5em;
`;

const Title = styled.span`
  flex: 1 1 0;
  padding: 0 1em;
  font-weight: bold;
`;

const Anchor = styled.a`
  padding: 0 0.5em;
  flex: 0 0 0;
  
  :hover {
    background-color: ${BORDER_COLOR};
    filter: brightness(130%);
  }
`;

export const TitleBar = ({
  loading, avatar, name, onLogout, load, history,
}) => {
  const title = loading ? 'Crews' : name;
  const onAvatarClick = () => {
    load().then((trackId) => {
      if (trackId) {
        history.push(`/track/${trackId}`);
      }
    });
  };
  return <Row>
    <Anchor onClick={onAvatarClick}>
      <AvatarTopMargin>
        <Image rounded src={avatar} size="2em" />
      </AvatarTopMargin>
    </Anchor>
    <Title>{title}</Title>
    <Anchor onClick={onLogout}>
      <i className="em em-x"></i>
    </Anchor>
  </Row>;
};

TitleBar.propTypes = {
  avatar: PropTypes.string,
  history: PropTypes.object,
  load: PropTypes.func,
  loading: PropTypes.bool,
  name: PropTypes.string,
  onLogout: PropTypes.func,
};

const mapStateToProps = ({ user: { profile: { loading, avatar, name } } }) =>
  ({ loading, avatar, name });

const mapDispatchToProps = dispatch => ({
  load: () => {
    dispatch(clearErrors());
    return dispatch(loadPlaybackInfo()).then((data) => {
      if (data.body) {
        return data.body.item.id;
      }
      dispatch(addError('Playback stopped. Please start playback and retry.'));
      return null;
    });
  },
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TitleBar));
