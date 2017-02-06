import React, { Component } from 'react';
import { render } from 'react-dom';

import Board from './src/Board';
import Dice from './src/Dice';

class App extends Component {
  state = {
    players: [{ id: 0, number: 0, color: 'red'} , { id: 1, number: 0, color: 'blue'} ],
    currentPlayer: 0,
  };

  onRoll = (number) => {
    // Do not do it this way; just for fun
    const current = Object.assign({}, this.state.players[this.state.currentPlayer]);
    if (number <= 100 - current.number) {
      current.number += number;
      
    }

    this.setState({
      players: this.state.players.map(player => player.id === current.id ? current : player),
      currentPlayer: (this.state.currentPlayer + 1) % 2,
    });
  };

  render() {
    const { players, currentPlayer } = this.state;

    return (
      <div>
        <Board size={10} players={players} currentPlayer = {currentPlayer}/>
        <Dice currentPlayer={players[(currentPlayer+1)%2]} onRoll={this.onRoll} />
      </div>
    );
  }
}

render(<App />, document.getElementById('board'));
