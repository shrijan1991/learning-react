import React, { Component } from 'react';
import { render } from 'react-dom';

import PlayerState from './src/lib/PlayerState';
import Player from './src/Player';
import Board from './src/Board';
import Dice from './src/Dice';


const PLAYER_TIMEOUT = 200;

const players = [
  { id: 'red', color: 'red' },
  { id: 'blue', color: 'blue' },
  { id: 'yellow', color: 'yellow' },
  { id: 'green', color: 'green' },
];

class App extends Component {
  state = {
    playersState: players.map(() => new PlayerState()),
    currentPlayer: 0,
    chooseGoti: null,
  };

  onRoll = (number, resetDice) => {
    const { currentPlayer, playersState } = this.state;

    const playerState = playersState[currentPlayer];
    if (playerState.needsOne() && number !== 1) {
      setTimeout(() => {
        this.setState({
          currentPlayer: (currentPlayer + 1) % players.length,
        });
        resetDice();
      }, PLAYER_TIMEOUT);
      return;
    }

    const choices = playerState.hasChoice(number);

    if (choices.length === 1) {
      playerState.update(number, choices[0]);
      this.setState({
        playersState: this.state.playersState,
      });
      setTimeout(() => {
        this.setState({
          currentPlayer: (currentPlayer + 1) % players.length,
        });
        resetDice();
      }, PLAYER_TIMEOUT);

      return;
    }

    // Give user a choice to select one of the blinking dots
    this.lastNumber = number;
    this.resetDice = resetDice;


    if (choices.length !== 0) {
      this.setState({
        chooseGoti: choices,
      });
    }
  };

  onGotiChosen = (gotiNumber) => {
    const { currentPlayer, playersState } = this.state;
    this.setState({
      chooseGoti: null,
    });

    const playerState = playersState[currentPlayer];
    playerState.update(this.lastNumber, gotiNumber);
    setTimeout(() => {
      if (this.lastNumber !== 1 && this.lastNumber !== 6) {
        this.setState({
          currentPlayer: (currentPlayer + 1) % players.length,
        });
      }
      this.resetDice();
    });
  }

  render() {
    const { playersState, currentPlayer, chooseGoti } = this.state;

    const currentPlayerId = players[currentPlayer].id;

    return (
      <div>
        <Board>
          { players.map((player, idx) =>
            <Player
              onGotiChosen={this.onGotiChosen}
              chooseGoti={idx === currentPlayer ? chooseGoti : null}
              key={player.id}
              id={player.id}
              color={player.color}
              gotis={playersState[idx].getPositions()}
            />)
          }
        </Board>
        <Dice caption={currentPlayerId} onRoll={this.onRoll} />
      </div>
    );
  }
}

// eslint-disable-next-line no-undef
render(<App />, document.getElementById('board'));
