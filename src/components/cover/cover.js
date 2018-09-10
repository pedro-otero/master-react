import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styled from 'styled-components';

import Image from 'components/Image';
import styles from './cover.css';

const CoverContainer = styled.div`
  position: relative;
`;

const Cover = ({
  src,
  year,
  yearClass,
}) => (
  <CoverContainer>
    <Image
        src={src}
        xs="6em"
        sm="7em"
        md="8em"
        lg="10em"
        xl="12em">
    </Image>
    <span className={classnames(styles.year, yearClass)}>
      {year}
    </span>
  </CoverContainer>);

Cover.propTypes = {
  src: PropTypes.string.isRequired,
  year: PropTypes.string.isRequired,
  yearClass: PropTypes.string,
};

export default Cover;
