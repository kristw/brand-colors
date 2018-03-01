import './App.css';

import React, { Component } from 'react';

import Grid from './components/Grid';
import brands from './data/brands.json';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>How well do you know the brand colors?</h1>
        <Grid cells={brands} />
      </div>
    );
  }
}

export default App;
