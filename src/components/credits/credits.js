import React from 'react';
import PropTypes from 'prop-types';

import './credits.css';
import Collaborator from '../collaborator/collaborator';

const Credits = ({ data }) => (
  <div className="credits">
    {Object.keys(data)
      .map(key => (
        <Collaborator
            key={`collaborator-${key}`}
            name={key}
            roles={data[key]} />
      ))}
  </div>);

Credits.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Credits;
