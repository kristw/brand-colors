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
  border: 3px solid #333;
  background: rgba(255, 255, 255, 0.9);
  transition: all .3s;

  &:hover {
    color: #fff;
    background: #333;
  }
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

const NextPane = styled.div`
  position: absolute;
  top: 10px;
  bottom: -10px;
  right: 34px;
  left: 434px;
  padding-top: 220px;
  background-color: rgba(255, 255, 255, 0.75);
`;

const H2 = styled.h2`
  margin-top: 0;
`;

const FBContainer = styled.div`
  display: inline-block;
  vertical-align: top;
`;

class App extends Component {
  componentDidMount() {
    this.props.onInit();
  }

  renderChart() {
    const { actions } = this.props;
    if (actions.length > 0) {
      return (
        <div>
          <Legend />
          <ActivityChart data={actions} />
        </div>
      );
    }
    return null;
  }

  renderMessage() {
    const { flipped, answered, catalog } = this.props;
    if (flipped === 0) {
      return(
        <div>
          <p>
            Click on each box to see the choices.
          </p>
          <p>
            There are {catalog.brands.length} companies.<br />
            Answer as fast as you can!
          </p>
        </div>
      );
    } else if (catalog.hasEnded(answered)) {
      return (
        <p>You made it to the end. Great job!</p>
      );
    }
    return null;
  }

  renderNext() {
    const { catalog, page, answered, onNextPage } = this.props;
    if (catalog.hasNextPage(page) && catalog.hasFinishedPage(page, answered)) {
      return (
        <NextPane>
          <Button onClick={() => { onNextPage(page); }}>
            Next >>
          </Button>
        </NextPane>
      );
    }
    return null;
  }

  render() {
    const {
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
            <div>
              <a
                href="https://twitter.com/share"
                className="twitter-share-button"
                data-text="Guess companies from the colors"
                data-via="kristw"
                data-related="kristw"
                data-hashtags="challenge"
              >
                Tweet
                </a>
              &nbsp;
                <iframe
                src="https://ghbtns.com/github-btn.html?user=kristw&repo=brand-colors&type=star&count=true"
                frameborder="0"
                scrolling="0"
                width="90px"
                height="20px"
              />
              <FBContainer>
                <div
                  className="fb-like"
                  data-href="https://kristw.github.io/brand-colors"
                  data-layout="button_count"
                  data-action="like"
                  data-size="small"
                  data-show-faces="false"
                  data-share="true"
                />
              </FBContainer>
            </div>
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
            {this.renderMessage()}
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
                    answered: answered + 1,
                  });
                }
              }}
            />
          </Right>
          {this.renderNext()}
          <Footer>
            {this.renderChart()}
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
