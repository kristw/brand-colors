import './App.css';

import React, { Component } from 'react';

import Grid from './components/Grid';
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
};
const defaultProps = {
  className: '',
  cells: [],
  onInit() {},
  onNextPage() {},
  onCellClick() { },
};

const Button = styled.button`
  margin-top: 30px;
  font-size: 28px;
  padding: 4px 15px 5px 15px;
  font-weight: 700;
  border: 3px solid #222;
  background: rgba(0,0,0,0);
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
    const { catalog, seen, hasUnopened, hasNextPage, onNextPage } = this.props;
    if (hasNextPage
      && seen > 0
      && seen % catalog.pageSize === 0
      && !hasUnopened) {
      return (
        <Button onClick={() => { onNextPage(); }}>
          Next >>
        </Button>
      )
    }
    return null;
  }

  render() {
    const { actions, catalog, cells, onCellClick, onCellScore, flipped, seen, score } = this.props;
    return (
      <div className="App">
        <div className="frame">
          <div className="left">
            <h1>Guess companies <br /> from the colors</h1>
            <Subtitle>
              <TimerBox>
                <H2>
                  <Timer ref={c => { this.timer = c; }} />
                </H2>
              </TimerBox>
              <ScoreBox>
                <H2>Score: {score}/{seen}</H2>
              </ScoreBox>
            </Subtitle>
            {flipped === 0
              ? <p>
                Click on each box to see the choices.
              </p>
              : null}
            {this.renderNext()}

          </div>
          <div className="right">
            <Grid
              cells={cells}
              onCellClick={(index, cell) => {
                if (flipped === 0) {
                  this.timer.start();
                }
                onCellClick(index, cell);
              }}
              onCellScore={(...args) => {
                if (seen === catalog.brands.length - 1) {
                  this.timer.stop();
                }
                onCellScore(...args);
              }}
            />
          </div>
          <div className="footer">
            {actions.length > 0
              ? <ActivityChart
                  className="activity-chart"
                  data={actions}
                />
              : null}
            &copy; 2018 &mdash; Krist Wongsuphasawat /
            <a href="https://twitter.com/kristw">@kristw</a>
          </div>
        </div>
      </div>
    );
  }
}

App.propTypes = propTypes;
App.defaultProps = defaultProps;

export default App;

