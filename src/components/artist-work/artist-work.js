import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Link from 'components/Link';
import Banner from 'components/Banner';
import Cover from 'components/Cover';
import Label from 'components/Label';

import styles from './artist-work.css';

const Margin = styled.div`
  @media (max-width: 320px) {
    margin-right: 0.5em;
  }

  @media (min-width: 321px) and (max-width: 768px) {
    margin-right: 0.5em;
  }

  @media (min-width: 769px) and (max-width: 1280px) {
    margin-right: 1.7em;
  }
  
  @media (min-width: 1281px) and (max-width: 1919px) {
    margin-right: 2em;
  }
  
  @media (min-width: 1920px) {
    margin-right: 2em;
  }
`;

const ArtistWork = ({
  title, artist, artistId, background, image, year, children, path,
}) => (
  <Banner
      src={background}
      className={styles.content}>
    <Link to={path}>
      <Margin>
        <Cover
            src={image}
            year={year}
            yearClass={styles.albumYear} />
      </Margin>
    </Link>
    <div>
      <Link
          to={`/artist/${artistId}`}
          className={styles.artistName}>
        {artist}
      </Link>
      <Label
          className={styles.title}
          value={title} />
      {children}
    </div>
  </Banner>
);

ArtistWork.propTypes = {
  artist: PropTypes.string,
  artistId: PropTypes.string,
  background: PropTypes.string,
  children: PropTypes.array,
  image: PropTypes.string,
  path: PropTypes.string,
  title: PropTypes.string,
  year: PropTypes.string,
};

export default ArtistWork;
