import * as React from 'react';
import PropTypes from 'prop-types';

import JointList from './joint-list';
import './composers.css';

const Composers = ({ list }) => <JointList
    className="composers"
    start="("
    values={list}
    end=")" />;

Composers.propTypes = {
  list: PropTypes.array.isRequired,
};

export default Composers;
