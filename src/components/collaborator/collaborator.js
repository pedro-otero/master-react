import React from 'react';
import PropTypes from 'prop-types';

import styles from './collaborator.css';

const Collaborator = ({ name, roles }) => <div>
  <h3 className={styles.collaboratorName}>
    {name}:
  </h3>
  <p>{roles.join(', ')}</p>
</div>;

Collaborator.propTypes = {
  name: PropTypes.string.isRequired,
  roles: PropTypes.array.isRequired,
};

export default Collaborator;
