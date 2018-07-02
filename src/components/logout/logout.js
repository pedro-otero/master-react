import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  all: unset;
  width: 100%;
  font-weight: bold;
  background-color: #3d3d3d;
  color: #181818;
  text-align: center;
  padding: 0.5em 0;
`;

const Logout = () => (
  <Button
      type="button"
      onClick={() => {
          window.localStorage.clear();
          window.location.reload();
        }}>
      Logout
  </Button>
);

export default Logout;
