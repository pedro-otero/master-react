import * as React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  margin: 1em;
`;

const Home = () => (
  <Container>
    <h1>Hey</h1>
    <p>{"If you want to check the credits of the song you're listening to, click on "}<i className="em em-arrow_forward"></i></p>
    <p>To logout, click on <i className="em em-x"></i></p>
  </Container>
);

export default Home;
