import React from 'react';
import styled from 'styled-components';

const Empty = styled.div`
  padding: 0.5em;
  width: 100%;
  text-align: center;
  color: grey;
`;

const NoItems = () => (
  <Empty>
    <i className="em em-man-gesturing-no"></i>
    <br />
    <small>No items</small>
  </Empty>
);

export default NoItems;
