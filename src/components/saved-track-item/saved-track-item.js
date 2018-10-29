import React from 'react';
import PropTypes from 'prop-types';

import ListItem from 'components/ListItem';

const SavedTrackItem = ({
  id, name, artist, album,
}) => {
  const additional = `${artist} - ${album}`;
  return <ListItem
      path={`/track/${id}`}
      name={name}
      additional={additional} />;
};

SavedTrackItem.propTypes = {
  album: PropTypes.string,
  artist: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
};

export default SavedTrackItem;
