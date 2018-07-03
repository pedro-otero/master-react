import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const BG_COLOR = '#474747';
const BORDER_COLOR = '#7f7f7f';

const Row = styled.div`
  display: flex;
  position: sticky;
  top: 0;
  background-color: ${BG_COLOR};
  line-height: 3em;
  vertical-align: middle;
  border-bottom: 1px solid ${BORDER_COLOR};
`;

// To use after avatar is available
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

const Anchor = styled.a`
  padding: 0 0.5em;
  flex: 0 0 0;
  
  :hover {
    background-color: ${BORDER_COLOR};
  }
`;

const TitleBar = ({ avatar, title, onLogout }) => (
  <Row>
    <Link to="/player">
      <Anchor>
        <i className="em em-arrow_forward"></i>
      </Anchor>
    </Link>
    <Title>{title}</Title>
    <Anchor onClick={onLogout}>
      <i className="em em-x"></i>
    </Anchor>
  </Row>
);

TitleBar.propTypes = {
  avatar: PropTypes.string,
  onLogout: PropTypes.func,
  title: PropTypes.string,
};

export default TitleBar;
