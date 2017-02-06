import React, { Component } from 'react';
import { render } from 'react-dom';

import Board from './src/Board';
import Dice from './src/Dice';

const cellProps = {
  safe: [[8,1],[12,6],[13,8],[8,12],[6,13],[2,8],[1,6],[6,2]],
  home: [[6,6],[6,7],[6,8],[7,6],[7,7],[7,8],[8,6],[8,7],[8,8]]
};

class App extends Component {
  state = {
    players:[{id:1,pos:0,color:'red'},{id:2,pos:0,color:'blue'},{id:3,pos:0,color:'yellow'},{id:4,pos:0,color:'green'}],
    currentPlayer: 0,
  }

  onRoll = (number) => {
    // Do not do it this way; just for fun
    const current = Object.assign({}, this.state.players[0]);
    if (number <= 57 - current.pos) 
      current.pos += number;

    this.setState({
      players: this.state.players.map(player => player.id === current.id ? current : player),
    });
  };

  render() {
    const {players} = this.state;
      
    return (
      <div>
        <Board players = {players}/>
        <Dice currentPlayer={players} onRoll={this.onRoll} />
      </div>
    );
  }
}

render(<App />, document.getElementById('board'));
