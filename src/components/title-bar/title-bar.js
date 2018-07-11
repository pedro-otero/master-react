import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { loadPlaybackInfo } from '../../redux/playbackInfo';
import { addError, clearErrors } from '../../redux/errors';

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

// To use after avatar is available
const Avatar = styled.div`
  border-radius: 100%;
  background-image: url(${({ src }) => src});
  background-size: cover;
  margin-top: 0.5em;
  width: 2em;
  height: 2em;
  flex: 0 0 2em;
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
  loading, avatar, name, onLogout, loadPlaybackInfo, history, addError, clearErrors,
}) => {
  const title = loading ? 'Crews' : name;
  const onAvatarClick = () => {
    clearErrors();
    loadPlaybackInfo().then((data) => {
      if (data.body) {
        history.push(`/track/${data.body.item.id}`);
      } else {
        addError('Playback stopped. Please start playback and retry.');
      }
    });
  };
  return <Row>
    <Anchor onClick={onAvatarClick}>
      <Avatar src={avatar} />
    </Anchor>
    <Title>{title}</Title>
    <Anchor onClick={onLogout}>
      <i className="em em-x"></i>
    </Anchor>
  </Row>;
};

TitleBar.propTypes = {
  addError: PropTypes.func,
  avatar: PropTypes.string,
  history: PropTypes.object,
  loadPlaybackInfo: PropTypes.func,
  loading: PropTypes.bool,
  name: PropTypes.string,
  onLogout: PropTypes.func,
};

const mapStateToProps = ({ user: { profile: { loading, avatar, name } } }) =>
  ({ loading, avatar, name });

const mapDispatchToProps = dispatch => ({
  loadPlaybackInfo: () => dispatch(loadPlaybackInfo()),
  addError: message => dispatch(addError(message)),
  clearErrors: () => dispatch(clearErrors()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TitleBar));
