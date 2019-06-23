import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const LoadFailure = ({ message, failed }) => {
  if (failed) {
    return (
      <Fragment>
        <i className="em em--1"></i>
        <h1>{message}</h1>
      </Fragment>
    );
  }
  return null;
};

LoadFailure.propTypes = {
  failed: PropTypes.bool,
  message: PropTypes.string,
};

function mapStateToProps(state, { itemType, id }) {
  const collection = state[itemType];
  const { failed } = collection[id] || {};
  return {
    failed,
  };
}

export default connect(mapStateToProps)(LoadFailure);
