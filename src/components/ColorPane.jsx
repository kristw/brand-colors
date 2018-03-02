import PropTypes from 'prop-types';
import React from 'react';

const propTypes = {
  className: PropTypes.string,
  colors: PropTypes.arrayOf(PropTypes.string).isRequired,
};
const defaultProps = {
  className: '',
};

class ColorPane extends React.Component {
  render() {
    const { className, colors } = this.props;
    const partSize = Math.round(100 / colors.length);
    return (
      <svg className={className} width="100%" height="100%">
        {colors.map((c, i) => (
          <rect
            x={`${i * partSize}%`}
            width={`${partSize}%`}
            height="100%"
            fill={c}
          />
        ))}
      </svg>
    );
  }
}

ColorPane.propTypes = propTypes;
ColorPane.defaultProps = defaultProps;

export default ColorPane;
