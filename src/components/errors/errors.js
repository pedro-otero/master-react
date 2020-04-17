import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Error = styled.div`
  background-color: red;
  font-weight: bold;
  padding: 10px;
  z-index: 2000;
  position: relative;
`;

export const Errors = ({ list }) => (
  <Fragment>
    {list.map(error => <Error key={`error-${error}`}>{error}</Error>)}
  </Fragment>
);

Errors.propTypes = {
  list: PropTypes.array,
};

export default Errors;
