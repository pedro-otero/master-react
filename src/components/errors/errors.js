import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';

const Error = styled.div`
  background-color: red;
  font-weight: bold;
  padding: 10px;
`;

export const Errors = ({ list }) => (
  <Fragment>
    {list.map(error => <Error key={`error-${error}`}>{error}</Error>)}
  </Fragment>
);

Errors.propTypes = {
  list: PropTypes.array,
};

const mapStateToProps = ({ errors }) => ({ list: errors });

export default connect(mapStateToProps)(Errors);
