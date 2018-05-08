import React from 'react';
import PropTypes from 'prop-types';

const JointList=({values})=>{
  return(
    <span className="main">{values.join(', ')}</span>
  );
};

JointList.propTypes = {
  values:PropTypes.array.isRequired,
}

export default JointList;
