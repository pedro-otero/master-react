import React from 'react';
import PropTypes from 'prop-types';

const JointList=({values,start,end})=>{
  return(
    <span className="main">{start}{values.join(', ')}{end}</span>
  );
};

JointList.propTypes = {
  values:PropTypes.array.isRequired,
  start:PropTypes.string,
  end:PropTypes.string,
}

export default JointList;
