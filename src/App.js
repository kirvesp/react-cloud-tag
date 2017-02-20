import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import TagCloud from './tagcloud.component';

window.Tags = ['test-tag'];

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
          <TagCloud tags={window.Tags} onChange={(tags) => { console.info(tags); }}/>
      </div>
    );
  }
}

export default App;
