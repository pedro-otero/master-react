import * as React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

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
    <p>Swipe right for menu</p>
  </Container>;
};

Home.propTypes = {
  loading: PropTypes.bool,
  name: PropTypes.string,
  userId: PropTypes.string,
};

export default Home;
