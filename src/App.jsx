import './App.css';

import React, { Component } from 'react';

import Grid from './components/Grid';
import brands from './data/brands.json';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Guess companies <br /> from the colors</h1>
        <Grid cells={brands} />
        <div className="footer">
          &copy; 2018 &mdash; Krist Wongsuphasawat /
          <a href="https://twitter.com/kristw">@kristw</a>
        </div>
      </div>
    );
  }
}

export default App;
