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
  margin: 0 13px 25px 13px;
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
  padding-top: 40px;
  font-weight: 700;
`;

const Answer = styled.div`
`;

const ScoreLine = styled.div`
  margin-top: 20px;
  margin-bottom: 0.1em;
  font-size: 0.9em;
  font-weight: normal;
`;

const Button = styled.button`
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
  font-weight: 700;
  width: 120px;
  padding: 6px;
  margin: 5px 2px 0 2px;
  text-align: center;
`;

class Cube extends React.Component {
  renderScore() {
    const { cell, onScore } = this.props;
    const score = cell.score;
    if (score === null) {
      const buttons = [
        <Button key="y" onClick={e => {
          onScore(1);
          e.stopPropagation();
        }}>
          {cell.brand.name}
        </Button>,
        <Button key="n" onClick={e => {
          onScore(0);
          e.stopPropagation();
        }}>
          {cell.brand.distraction.name}
        </Button>
      ];

      return (
        <div>
          {cell.answerIndex === 0 ? buttons : buttons.reverse()}
        </div>
      );
    } else if (score === 1) {
      return (
        <div>
          <ScoreLine>
            <img src={correctIcon} height="10" alt="" />
            &nbsp;Correct!
          </ScoreLine>
          <Answer>
            {cell.brand.name}
          </Answer>
        </div>
      );
    }
    return (
      <div>
        <ScoreLine>
          <img src={wrongIcon} height="10" alt="" />
          &nbsp;Wrong.
        </ScoreLine>
        <Answer>
          {cell.brand.name}
        </Answer>
      </div>
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