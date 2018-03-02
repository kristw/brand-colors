import ColorPane from './ColorPane';
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
	display: inline-block;
	text-align: center;
  margin: 0 10px;
  width: 150px;
	height: 150px;
	transition: transform .5s; /* Animate the transform properties */
	transform-style: preserve-3d; /* <-NB */

  &:hover {
    transform: rotateX(89deg); /* Text bleed at 90º */
  }
`;

const Side = styled.div`
  background: rgb(255, 255, 255);
	height: 150px;
`;

const Front = styled(Side)`
  position: relative;
  transform: translateZ(75px);
`;

const Back = styled(Side)`
  // border: 1px solid rgba(196, 196, 196, 1);
  background: #f0f0f0;
  transform: rotateX(-90deg) translateZ(-75px);
`;

const BackContent = styled.div`
  padding-top: 70px;
  font-weight: 700;
`;

class Cube extends React.Component {
  render() {
    const { className, cell } = this.props;
    return (
      <Container className={className}>
        <Front>
          <ColorPane colors={cell.colors} />
        </Front>
        <Back>
          <BackContent>
            {cell.name}
          </BackContent>
        </Back>
      </Container>
    );
  }
}

Cube.propTypes = propTypes;
Cube.defaultProps = defaultProps;

export default Cube;