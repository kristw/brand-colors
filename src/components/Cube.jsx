import ColorPane from './ColorPane';
import PropTypes from 'prop-types';
import React from 'react';
import correctIcon from '../images/correct.png';
import styled from 'styled-components';
import wrongIcon from '../images/wrong.png';

const propTypes = {
  className: PropTypes.string,
  cell: PropTypes.object.isRequired,
  onClick: PropTypes.func,
  onScore: PropTypes.func,
};
const defaultProps = {
  className: '',
  onClick() {},
  onScore() {},
};

const Wrap = styled.div`
	display: inline-block;
  vertical-align: top;
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

  &:hover {
    transform: rotateX(10deg); /* Text bleed at 90º */
  }
  &.open {
    transform: rotateX(85deg); /* Text bleed at 90º */
  }
`;

const Side = styled.div`
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
  padding-top: 60px;
  font-weight: 700;
`;

const ScoreLine = styled.div`
  margin-top: 0.1em;
  font-size: 0.9em;
  font-weight: normal;
`;

const Button = styled.button`
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 40px;
  padding-top: 4px;
  margin: 5px 2px 0 2px;
  text-align: center;
`;

class Cube extends React.Component {
  renderScore() {
    const { cell, onScore } = this.props;
    const score = cell.score;
    if (score === null) {
      return (
        <div>
          <Button onClick={e => {
            onScore(1);
            e.stopPropagation();
          }}>
            <img src={correctIcon} alt=""/>
          </Button>
          <Button onClick={e => {
            onScore(0);
            e.stopPropagation();
          }}>
            <img src={wrongIcon} alt=""/>
          </Button>
        </div>
      );
    } else if (score === 1) {
      return (
        <ScoreLine>
          <img src={correctIcon} height="10" alt="" />
          &nbsp;Correct!
        </ScoreLine>
      );
    }
    return (
      <ScoreLine>
        <img src={wrongIcon} height="10" alt="" />
        &nbsp;Wrong.
      </ScoreLine>
    );
  }

  render() {
    const { className, cell, onClick } = this.props;
    return (
      <Wrap className={className} onClick={e => { onClick(e); }}>
        <Container className={cell.open ? 'open' : ''}>
          <Front>
            <ColorPane colors={cell.brand.colors} />
          </Front>
          <Down>
            <BackContent>
              {cell.brand.name}
              {this.renderScore()}
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