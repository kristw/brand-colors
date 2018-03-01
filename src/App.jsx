import './App.css';

import React, { Component } from 'react';

import Grid from './components/Grid';

class App extends Component {

  render() {
    return (
      <div className="App">
        <Grid cells={[1,2,3]} />
      </div>
    );
  }
}

export default App;
