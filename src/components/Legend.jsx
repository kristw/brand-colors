import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

const propTypes = {
  className: PropTypes.string,
};
const defaultProps = {
  className: '',
};

const Container = styled.div`
  font-size: 11px;
  text-align:right;
  margin-right: 40px;
`;

const Svg = styled.svg`
  display: inline-block;
  vertical-align: middle;
  width: 12px;
  height: 12px;
`;

class Legend extends React.Component {
  render() {
    const { className } = this.props;
    return (
      <Container className={className}>
        <Svg>
          <circle
            cx="5"
            cy="5"
            r="1"
            fill="none"
            stroke="#222"
            strokeWidth="2"
          />
        </Svg>
        Flip
        &nbsp;
        <Svg>
          <circle
            cx="5"
            cy="5"
            r="3"
            fill="none"
            stroke="#2E9E49"
            strokeWidth="2"
          />
        </Svg>
        Correct
        &nbsp;
        <Svg>
          <circle
            cx="5"
            cy="5"
            r="3"
            fill="none"
            stroke="#E73A2F"
            strokeWidth="2"
          />
        </Svg>
        Wrong
        &nbsp;
        <Svg>
          <rect
            x="5"
            y="0"
            width="1"
            height="12"
            fill="#222"
          />
        </Svg>
        Next Page
      </Container>
    );
  }
}

Legend.propTypes = propTypes;
Legend.defaultProps = defaultProps;

export default Legend;
