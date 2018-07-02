import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const BG_COLOR = '#474747';
const BORDER_COLOR = '#7f7f7f';

const Row = styled.div`
  display: flex;
  background-color: ${BG_COLOR};
  line-height: 3em;
  vertical-align: middle;
  border-bottom: 1px solid ${BORDER_COLOR};
`;

const Avatar = styled.div`
  border-radius: 100%;
  background-image: url(${({ src }) => src});
  background-size: cover;
  height: 2em;
  border: 0.5em solid ${BG_COLOR};
  flex: 0 0 2em;
`;

const Title = styled.span`
  flex: 1 1 0;
  border-left: 1px solid ${BORDER_COLOR};
  border-right: 1px solid ${BORDER_COLOR};
  padding: 0 1em;
  font-weight: bold;
`;

const Logout = styled.a`
  padding: 0 0.5em;
  flex: 0 0 0;
  
  :hover {
    background-color: ${BORDER_COLOR};
  }
`;

const TitleBar = ({ avatar, title, onLogout }) => (
  <Row>
    <Avatar src={avatar} />
    <Title>{title}</Title>
    <Logout onClick={onLogout}>
      <i className="em em-x"></i>
    </Logout>
  </Row>
);

TitleBar.propTypes = {
  avatar: PropTypes.string,
  onLogout: PropTypes.func,
  title: PropTypes.string,
};

export default TitleBar;
