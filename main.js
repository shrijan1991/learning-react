import React, { Component } from 'react';
import Board from './src/Board';
import WelcomeScreen from './src/Welcome';
import ReactDOM from 'react-dom';






class Main extends Component {

  startGame() {
    ReactDOM.render(<Board call="newgame"/>, document.getElementById('root'));
  }

  render() {
    return (
      <div>
        <WelcomeScreen message="Welcome to 4-of-a-kind!" start={() => this.startGame()} />
      </div>
    );
  }
}

ReactDOM.render(<Main />, document.getElementById('root'));
