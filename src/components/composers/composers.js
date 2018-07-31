import * as React from 'react';
import PropTypes from 'prop-types';

import JointList from 'components/JointList';
import styles from './composers.css';

const Composers = ({ list }) => <JointList
    className={styles.composers}
    start="("
    values={list}
    end=")" />;

Composers.propTypes = {
  list: PropTypes.array.isRequired,
};

export default Composers;
