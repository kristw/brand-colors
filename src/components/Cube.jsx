import PropTypes from 'prop-types';
import React from 'react';

const propTypes = {
  className: PropTypes.string,
};
const defaultProps = {
  className: '',
};

class Cube extends React.Component {
  render() {
    const { className } = this.props;
    return (
      <div className={className}>
        under construction
      </div>
    );
  }
}

Cube.propTypes = propTypes;
Cube.defaultProps = defaultProps;

export default Cube;
