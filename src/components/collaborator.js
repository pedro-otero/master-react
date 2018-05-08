import React from 'react';
import PropTypes from 'prop-types';

import './collaborator.css';

const Collaborator = ({ name, roles }) => <div>
  <h5 className="collaboratorName">
    {name}:
  </h5>
  <p>{roles.join(', ')}</p>
</div>;

Collaborator.propTypes = {
  name: PropTypes.string.isRequired,
  roles: PropTypes.array.isRequired,
};

export default Collaborator;
