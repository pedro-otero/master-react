import React from 'react';
import PropTypes from 'prop-types';

import ListItem from 'components/ListItem';

const SavedAlbumItem = ({
  id, name, artist,
}) => <ListItem
    path={`/album/${id}`}
    name={name}
    additional={artist} />;

SavedAlbumItem.propTypes = {
  artist: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
};

export default SavedAlbumItem;
