import * as React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';

import LoadingCircle from 'components/LoadingCircle';

const Container = styled.div`
  margin: 1em;
`;

export const Home = ({ loading, userId, name }) => {
  if (loading) {
    return <LoadingCircle message="Loading..." />;
  }
  return <Container>
    <h1>Hey {name.split(' ')[0]}</h1>
    <h3>AKA {userId}</h3>
    <p>{"If you want to check the credits of the song you're listening to, click on your avatar (top left)"}</p>
    <p>To logout, click on <i className="em em-x"></i></p>
  </Container>;
};

Home.propTypes = {
  loading: PropTypes.bool,
  name: PropTypes.string,
  userId: PropTypes.string,
};

const mapStateToProps = ({ user: { profile: { loading, userId, name } } }) =>
  ({ loading, userId, name });

export default connect(mapStateToProps)(Home);
