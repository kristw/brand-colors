import './App.css';

import React, { Component } from 'react';

import Grid from './components/Grid';
import PropTypes from 'prop-types';

const propTypes = {
  className: PropTypes.string,
  cells: PropTypes.array,
  onInit: PropTypes.func,
  onCellClick: PropTypes.func,
};
const defaultProps = {
  className: '',
  cells: [],
  onInit() {},
  onCellClick() { },
};

class App extends Component {
  componentDidMount() {
    this.props.onInit();
  }

  render() {
    const { cells, onCellClick, onCellScore, seen, score } = this.props;
    return (
      <div className="App">
        <h1>Guess companies <br /> from the colors</h1>
        <h2>{score} / {seen}</h2>
        <Grid
          cells={cells}
          onCellClick={onCellClick}
          onCellScore={onCellScore}
        />
        <div className="footer">
          &copy; 2018 &mdash; Krist Wongsuphasawat /
          <a href="https://twitter.com/kristw">@kristw</a>
        </div>
      </div>
    );
  }
}

export default App;
