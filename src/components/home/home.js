import * as React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import LoadingCircle from '../loading-circle/loading-circle';

const Container = styled.div`
  margin: 1em;
`;

const Home = ({ loading, id, name }) => {
  if (loading) {
    return <LoadingCircle message="Loading..." />;
  }
  return <Container>
    <h1>Hey {name.split(' ')[0]}</h1>
    <h3>AKA {id}</h3>
    <p>{"If you want to check the credits of the song you're listening to, click on "}<i
        className="em em-arrow_forward"></i></p>
    <p>To logout, click on <i className="em em-x"></i></p>
  </Container>;
};

Home.propTypes = {
  id: PropTypes.string,
  loading: PropTypes.bool,
  name: PropTypes.string,
};

const mapStateToProps = ({ user: { profile: { loading, id, name } } }) => ({ loading, id, name });

export default connect(mapStateToProps)(Home);
