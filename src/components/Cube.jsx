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

const Wrap = styled.div`
	display: inline-block;
  perspective: 1500px;
  margin: 10px;
`;

const Container = styled.div`
  position: relative;
  width: 150px;
	height: 150px;
	text-align: center;
	transition: transform .5s; /* Animate the transform properties */
  transform-style: preserve-3d; /* <-NB */
  // transform: rotateY(-10deg);

  &:hover {
    transform: rotateX(85deg); /* Text bleed at 90º */
  }
`;

const Side = styled.div`
  // border: 5px solid #000;
  background: rgb(255, 255, 255);
	height: 100%;
`;

const Front = styled(Side)`
  position: relative;
  transform: translateZ(75px);
`;

const Down = styled(Side)`
  background: #fefefe;
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
      <Wrap className={className}>
        <Container>
          <Front>
            <ColorPane colors={cell.colors} />
          </Front>
          <Down>
            <BackContent>
              {cell.name}
            </BackContent>
          </Down>
        </Container>
      </Wrap>
    );
  }
}

Cube.propTypes = propTypes;
Cube.defaultProps = defaultProps;

export default Cube;