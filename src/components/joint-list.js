import React from 'react';
import PropTypes from 'prop-types';

const JointList=({values,start,end, className})=>{
  return(
    <span className={className}>{start}{values.join(', ')}{end}</span>
  );
};

JointList.propTypes = {
  values:PropTypes.array.isRequired,
  start:PropTypes.string,
  end:PropTypes.string,
  className:PropTypes.string,
}

export default JointList;
