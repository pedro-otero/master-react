import React from 'react';
import PropTypes from 'prop-types';

import styles from './credits.css';
import Collaborator from '../collaborator/collaborator';

const Credits = ({ data }) => (
  <div className={styles.credits}>
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
