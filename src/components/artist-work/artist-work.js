import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Banner from '../banner/banner';
import Cover from '../cover/cover';
import Label from '../label/label';

import styles from './artist-work.css';
import globalStyles from '../../index.css';

const ArtistWork = ({
  title, artist, background, image, year, children, path,
}) => {
  const CustomCover = <Cover
      src={image}
      year={year}
      yearClass={styles.albumYear} />;

  const CoverWrap = path ?
    <Link
        to={path}
        className={globalStyles.RRlink}>
      {CustomCover}
    </Link> :
    CustomCover;

  return <Banner
      src={background}
      className={styles.content}>
    {CoverWrap}
    <div>
      <Label
          className={styles.artistName}
          value={artist} />
      <Label
          className={styles.title}
          value={title} />
      {children}
    </div>
  </Banner>;
};

ArtistWork.propTypes = {
  artist: PropTypes.string,
  background: PropTypes.string,
  children: PropTypes.array,
  image: PropTypes.string,
  path: PropTypes.string,
  title: PropTypes.string,
  year: PropTypes.string,
};

export default ArtistWork;
