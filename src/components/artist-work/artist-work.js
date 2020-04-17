import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import Banner from 'components/Banner';
import Cover from 'components/Cover';

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
}) => {
  let workImage = <Margin>
    <Cover
        src={image}
        year={year}
        yearClass={styles.albumYear} />
  </Margin>;
  if (path) {
    workImage = <Link to={path}>{workImage}</Link>;
  }
  return (
    <Banner
        src={background}
        className={styles.content}>
      {workImage}
      <div>
        <Link to={`/artist/${artistId}`}>
          <span className={styles.artistName}>
            {artist}
          </span>
        </Link>
        <span>
          <span className={styles.title}>{title}</span>
          <br />
        </span>
        {children}
      </div>
    </Banner>
  );
};

ArtistWork.propTypes = {
  artist: PropTypes.string,
  artistId: PropTypes.string,
  background: PropTypes.string,
  children: PropTypes.node,
  image: PropTypes.string,
  path: PropTypes.string,
  title: PropTypes.string,
  year: PropTypes.string,
};

export default ArtistWork;
