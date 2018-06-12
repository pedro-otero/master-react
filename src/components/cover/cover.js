import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styled from 'styled-components';

import './cover.css';

const Image = styled.div`
  background-image: url(${props => props.src});
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
