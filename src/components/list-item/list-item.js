import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Link from 'components/Link';

const Name = styled.div`
  padding: 0.5em 0.5em 0.1em 0.5em;
  font-weight: bold;
`;

const Additional = styled.div`
  padding: 0.1em 0.5em 0.5em 0.5em;
  font-size: smaller;
`;

const ListItem = ({ path, name, additional }) => (
  <Link to={path}>
    <Name>{name}</Name>
    <Additional>{additional}</Additional>
  </Link>
);

ListItem.propTypes = {
  additional: PropTypes.string,
  name: PropTypes.string,
  path: PropTypes.string,
};

export default ListItem;
