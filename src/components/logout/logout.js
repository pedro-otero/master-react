import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  outline: none;
  width: 100%;
  font-weight: bold;
  background-color: #a9a9a9;
  color: #181818;
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
