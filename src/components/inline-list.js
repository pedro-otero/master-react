import React from 'react';
import PropTypes from 'prop-types';

const InlineList=({values})=>{
  return(
    <span className="main">{values.join(', ')}</span>
  );
};

InlineList.propTypes = {
  values:PropTypes.array.isRequired,
}

export default InlineList;
