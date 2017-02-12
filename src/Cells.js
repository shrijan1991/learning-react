import React, { Component} from 'react';

import {checkVictory, playertwo} from './CheckWin';

class Cells extends Component {
  constructor() {
    super();
    state= {
    availableSpaces: [0,1,2,3,4,5,6,7,8],
    players: [{
      id:0,
      spaces:[],
    },
    {
      id:1,
      spaces:[],
    },
    ],
    currentPlayer : 0,
  };
}

renderbutton(num) {
  const {availableSpaces, players, currentPlayer} = this.state;
  const defaultstyle = {
  visible:false,
  width: 196,
  height: 200,
  };
  const x = ((num % 3) * 200)+10;
  const y = (parseInt(num / 3) * 205)+5;

  console.log(availableSpaces);

  if(players[0].spaces.includes(num)){
    return (
      <a key={num} style={{ position:'absolute', top: y,  left: x }} >
        <div style = {defaultstyle} ><img src='../res/Tic-tac-toe-cross.png'/></div>
      </a>
    );
  } else if(players[1].spaces.includes(num)){
    return (
      <a key={num} style={{ position:'absolute', top: y,  left: x }} >
        <div style = {defaultstyle} ><img src='../res/Tic-tac-toe-nought.png'/></div>
      </a>
    );
  }
   else if(availableSpaces.includes(num)){
    return (
      <a key={num} style={{ position:'absolute', top: y,  left: x }} onClick = {() => this.clicked(num)}>
        <div style = {defaultstyle} />
      </a>
    );
   }
    else {
      return (
      <a key={num} style={{ position:'absolute', top: y,  left: x }} >
        <div style = {defaultstyle} />
      </a>
    );
    }

}

  clicked = (num) => {
    const {availableSpaces, players, currentPlayer} = this.state;
    const thisPlayer = players;
    players[currentPlayer].spaces.push(num);
    availableSpaces.splice(availableSpaces.indexOf(num),1);

    const nextPlayer = ((currentPlayer + 1) % 2);
    this.setState({
      availableSpaces: availableSpaces,
      players: players,
      currentPlayer: nextPlayer,
    }
    );
    if (players[currentPlayer].spaces.length > 2){
      if (checkVictory(players[currentPlayer].spaces.sort())){
        alert('Player '+(currentPlayer + 1) +' is victorious');
        this.setState({
          availableSpaces: [],
        });
      }
    }

    if(nextPlayer===1){
      const player2move = playertwo(players[0].spaces.sort(), players[1].spaces.sort());
    }

  }

  render () {

  const buttons = [];
  for(let i = 0; i <= 8 ; i++){
    buttons.push(i);
  }

  return (
      <div>
        {buttons.map(this.renderbutton)}
      </div>
    );
  }
}

export default Cells;