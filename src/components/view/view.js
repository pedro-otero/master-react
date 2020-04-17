import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';

export const ViewContext = React.createContext();

const View = ({ failureMessage, children }) => {
  const [isError, setIsError] = useState(false);

  if (isError) {
    return (
      <Fragment>
        <i className="em em--1"></i>
        <h1>{failureMessage}</h1>
      </Fragment>
    );
  }
  return (
    <ViewContext.Provider value={{ isError, setIsError }}>
      {children}
    </ViewContext.Provider>
  );
};

View.propTypes = {
  children: PropTypes.node,
  failureMessage: PropTypes.string,
};

export default View;
