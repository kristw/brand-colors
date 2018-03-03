import './App.css';

import React, { Component } from 'react';

import Grid from './components/Grid';
import PropTypes from 'prop-types';
import correctIcon from './images/correct.png';
import styled from 'styled-components';
import wrongIcon from './images/wrong.png';

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

class App extends Component {
  componentDidMount() {
    this.props.onInit();
  }

  renderNext() {
    const { catalog, seen, hasNextPage, onNextPage } = this.props;
    if (hasNextPage && seen > 0 && seen % catalog.pageSize === 0) {
      return (
        <Button onClick={() => { onNextPage(); }}>
          Next
        </Button>
      )
    }
    return null;
  }

  render() {
    const { cells, onCellClick, onCellScore, seen, score } = this.props;
    return (
      <div className="App">
        <div className="frame">
          <div className="left">
            <h1>Guess companies <br /> from the colors</h1>
            <h2>{score} / {seen}</h2>
            <p>
              Click on each box to see the choices.
            </p>
            {this.renderNext()}
          </div>
          <div className="right">
            <Grid
              cells={cells}
              onCellClick={onCellClick}
              onCellScore={onCellScore}
            />
          </div>
          <div className="footer">
            &copy; 2018 &mdash; Krist Wongsuphasawat /
            <a href="https://twitter.com/kristw">@kristw</a>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

