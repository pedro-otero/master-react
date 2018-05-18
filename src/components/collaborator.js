import React from 'react';
import PropTypes from 'prop-types';

import './collaborator.css';

const Collaborator = ({ name, roles }) => <div>
  <h3 className="collaboratorName">
    {name}:
  </h3>
  <p>{roles.join(', ')}</p>
</div>;

Collaborator.propTypes = {
  name: PropTypes.string.isRequired,
  roles: PropTypes.array.isRequired,
};

export default Collaborator;
