import React, { Component } from 'react';
import Board from './src/Board';
import WelcomeScreen from './src/Welcome';
import ReactDOM from 'react-dom';






class Main extends Component {

  onClick() {
    ReactDOM.render(<Board call="newgame"/>, document.getElementById('root'));
  }

  render() {
    return (
      <div>
        <WelcomeScreen start={() => this.onClick()} />
      </div>
    );
  }
}

ReactDOM.render(<Main />, document.getElementById('root'));
