import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Main = styled.div`
  padding: 1em;
`;

const Button = styled.a`
  width: 100%;
  text-align: center;
  background-color: #1db954;
  margin: 0;
  padding: 1em;
  box-sizing: border-box;
  font-weight: bold;
`;

const Welcome = ({ loginUrl }) => (
  <Main>
    <h1>Welcome</h1>
    <p>You need to login to Spotify to use this app.</p>
    <br />
    <Button href={loginUrl}>Login</Button>
  </Main>
);

Welcome.propTypes = {
  loginUrl: PropTypes.string,
};

export default Welcome;
