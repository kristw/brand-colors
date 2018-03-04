import React, { Component } from 'react';

import Grid from './components/Grid';
import Legend from './components/Legend';
import PropTypes from 'prop-types';
import Timer from './components/Timer';
import _ActivityChart from './components/ActivityChart';
import { createComponent } from 'react-d3kit';
import styled from 'styled-components';

const ActivityChart = createComponent(_ActivityChart);

const propTypes = {
  className: PropTypes.string,
  cells: PropTypes.array,
  onInit: PropTypes.func,
  onNextPage: PropTypes.func,
  onCellClick: PropTypes.func,
  onGameEnd: PropTypes.func,
};
const defaultProps = {
  className: '',
  cells: [],
  onInit() {},
  onNextPage() {},
  onCellClick() {},
  onGameEnd() {},
};

const Container = styled.div`
  text-align: center;
  padding: 30px;
`;

const Button = styled.button`
  margin-top: 30px;
  font-size: 28px;
  padding: 4px 15px 5px 15px;
  font-weight: 700;
  border: 3px solid #222;
  background: rgba(0,0,0,0);
`;

const Frame = styled.div`
  display: inline-block;
  width: 1000px;
  height: 530px;
  position: relative;
`;

const Left = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  width: 400px;
`;

const Right = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 400px;
`;

const Footer = styled.div`
  position: absolute;
  bottom: 0;
  width: 400px;
  color: #bbb;
  a {
    color: #555;
  }
`;

const Subtitle = styled.div`
  position: relative;
`;

const ScoreBox = styled.div`
  display: inline-block;
  margin-right: 20px;
  width: 170px;
  text-align: right;
`;

const TimerBox = styled.div`
  display: inline-block;
  margin-left: 20px;
  width: 170px;
  text-align: left;
`;

const H2 = styled.h2`
  margin-top: 0;
`;

class App extends Component {
  componentDidMount() {
    this.props.onInit();
  }

  renderNext() {
    const { catalog, hasUnopened, hasNextPage, onNextPage } = this.props;
    if (hasNextPage && !hasUnopened) {
      return (
        <Button onClick={() => { onNextPage(); }}>
          Next >>
        </Button>
      )
    }
    return null;
  }

  render() {
    const {
      actions,
      catalog,
      cells,
      onCellClick,
      onCellScore,
      onGameEnd,
      flipped,
      answered,
      score
    } = this.props;
    return (
      <Container className="App">
        <Frame>
          <Left>
            <h1>Guess companies <br /> from the colors</h1>
            <Subtitle>
              <TimerBox>
                <H2>
                  <Timer ref={c => { this.timer = c; }} />
                </H2>
              </TimerBox>
              <ScoreBox>
                <H2>Score: {score}/{answered}</H2>
              </ScoreBox>
            </Subtitle>
            {flipped === 0
              ? <div>
                <p>
                  Click on each box to see the choices.
                </p>
                <p>
                  There are {catalog.brands.length} companies.<br/>
                  Answer as fast as you can!
                </p>
              </div>
              : null}
            {answered === catalog.brands.length
              ? <p>You made it to the end. Great job!</p>
              : null}
            {this.renderNext()}
          </Left>
          <Right>
            <Grid
              cells={cells}
              onCellClick={(index, cell) => {
                if (flipped === 0) {
                  this.timer.start();
                }
                onCellClick(index, cell);
              }}
              onCellScore={(index, sc, cell) => {
                onCellScore(index, sc, cell);
                if (answered === catalog.brands.length - 1) {
                  this.timer.stop();
                  onGameEnd({
                    time: this.timer.getTime(),
                    score: score + sc,
                    answered,
                  });
                }
              }}
            />
          </Right>
          <Footer>
            {actions.length > 0
              ? (<div>
                <Legend />
                <ActivityChart data={actions} />
              </div>)
              : null}
            &copy; 2018 &mdash;&nbsp;
            <a href="http://kristw.yellowpigz.com">Krist Wongsuphasawat</a>
            &nbsp;
            (<a href="https://twitter.com/kristw">@kristw</a>)
            <div>
              <small>
                <a href="https://github.com/kristw/brand-colors">Source</a> on github
                &nbsp;/&nbsp;
                Colors from <a href="https://brandcolors.net/">Brand Colors</a>
              </small>
            </div>
          </Footer>
        </Frame>
      </Container>
    );
  }
}

App.propTypes = propTypes;
App.defaultProps = defaultProps;

export default App;
