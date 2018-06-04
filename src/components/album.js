import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

export const Album = ({ props }) => {

};

Album.propTypes = {
  id: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({});

export default connect(mapStateToProps)(Album);
