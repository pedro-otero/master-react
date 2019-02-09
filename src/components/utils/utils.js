import React from 'react';
import styled from 'styled-components';

export const Block = styled.div`
  @media (max-width: 320px) {
    margin: 0.5em;
  }
  
  @media (min-width: 321px) and (max-width: 768px) {
    margin: 0.5em;
  }
  
  @media (min-width: 769px) and (max-width: 1280px) {
    margin: 0 10%;
    width: 80%;
  }
  
  @media (min-width: 1281px) and (max-width: 1919px) {
    margin: 0 15%;
    width: 70%;
  }
  
  @media (min-width: 1920px) {
    margin: 0 20%;
    width: 60%;
  }
`;
