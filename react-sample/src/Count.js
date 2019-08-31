import React from 'react';
import PropTypes from 'prop-types';

function Count({ count }) {
  return <h2>{count}</h2>;
}

Count.propTypes = {
  count: PropTypes.number.isRequired,
};

export default Count;
