import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styled from 'styled-components';

import './cover.css';

const Image = styled.div`
  background-image: url(${props => props.src});
  background-size: cover;
  position: relative;
 
  @media (max-width: 320px) {
    margin-right: 0.5em;
    min-width: 6em;
    max-width: 6em;
    min-height: 6em;
    max-height: 6em;
  }

  @media (min-width: 321px) and (max-width: 768px) {
    margin-right: 0.5em;
    min-width: 7em;
    max-width: 7em;
    min-height: 7em;
    max-height: 7em;
  }

  @media (min-width: 769px) and (max-width: 1280px) {
    margin-right: 1.7em;
    min-width: 8em;
    max-width: 8em;
    min-height: 8em;
    max-height: 8em;
  }
  
  @media (min-width: 1281px) and (max-width: 1919px) {
    margin-right: 2em;
    min-width: 10em;
    max-width: 10em;
    min-height: 10em;
    max-height: 10em;
  }
  
  @media (min-width: 1920px) {
    margin-right: 2em;
    min-width: 12em;
    max-width: 12em;
    min-height: 12em;
    max-height: 12em;
  }
`;

const Cover = ({
  src,
  year,
  imageClass,
  yearClass,
}) => <Image
    src={src}
    className={imageClass}>
  <span className={classnames('year', yearClass)}>
    {year}
  </span>
</Image>;

Cover.propTypes = {
  imageClass: PropTypes.string,
  src: PropTypes.string.isRequired,
  year: PropTypes.string.isRequired,
  yearClass: PropTypes.string,
};

export default Cover;
