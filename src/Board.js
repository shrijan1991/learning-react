import React, { Component } from 'react';
import Players from './Players';

const boardMap = {
  3:  {type: 'ladder', goto: 21},
  7:  {type: 'ladder', goto: 35},
  17: {type: 'ladder', goto: 32},
  21: {type: 'ladder', goto: 72},
  38: {type: 'ladder', goto:66},
  46: {type: 'snake', goto: 28},
  51: {type: 'snake', goto: 48},
  55: {type: 'snake', goto: 6},
  62: {type: 'ladder', goto: 82},
  71: {type: 'snake', goto: 24},
  73: {type: 'ladder', goto:83},
  77: {type: 'snake', goto:67},
  93: {type: 'snake', goto:59},
  99: {type: 'snake', goto: 4},
}

class Board extends Component {

  renderPlayer = (player, idx) => {
  //   return <div key={idx} style={{background: player.color, width: 15, height: 15}} />;
      return (<Players player={player} key = {idx} index= {idx}/>);

  }

  generateRow(columns, row) {
    const players = this.props.players;
    const currentPlayer = this.props.currentPlayer;
    

    const rows = columns;
    const cells = [];
    const rowNumber = (rows - row - 1);
    const cellwidth = document.documentElement.clientWidth/12;
    
    for (let i = 0; i < columns; ++i) {
      const cellNumber = rowNumber * columns + ((rowNumber % 2 === 0) ?  i + 1 : (columns - i));
      

      const cellPlayers = players.filter(player => player.number === cellNumber);

      cells.push(
        <div key={i} style={{display: 'inline-block', width: cellwidth, height: 70, border: '1px solid black', textAlign: 'center'}}>
          {cellNumber}
          {cellPlayers.map(this.renderPlayer)}
        </div>
        
      );
      

    }
    return cells;
  }

  generateRows(rows) {
    const res = [];
    
    for (let i = 0; i < rows; ++i) {
      res.push(<div key={i}>{this.generateRow(rows, i)}</div>);
    }
    return res;
  }

  render() {
    const size = this.props.size;
    

    return (  
      <div>
        {this.generateRows(size)}
      </div>
    )
  }
}

export default Board;
