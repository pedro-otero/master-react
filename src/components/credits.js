import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import Collaborator from './collaborator';

const Credits = ({ data }) => <Fragment>
  {Object.keys(data)
    .map(key => (
      <Collaborator
          key={`collaborator-${key}`}
          name={key}
          roles={data[key]} />
   ))}
</Fragment>;

Credits.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Credits;
