import React, { Component } from 'react';

const boardMap = {
  3: { type: 'ladder', goto: 21 },
  7: { type: 'ladder', goto: 35 },
  99: { type: 'snake', goto: 4 },
}

class Board extends Component {

  renderPlayer = (player, idx) => {
    return <div key={idx} style={{background: player.color, width: 10, height: 10}} />;
  }

  generateRow(columns, row) {
    const players = this.props.players;

    const rows = columns;
    const cells = [];
    const rowNumber = (rows - row - 1);
    
    for (let i = 0; i < columns; ++i) {
      const cellNumber = rowNumber * columns + ((rowNumber % 2 === 0) ?  i + 1 : (columns - i));

      const cellPlayers = players.filter(player => player.number === cellNumber);

      cells.push(
        <div key={i} style={{display: 'inline-block', width: 50, height: 50, border: '1px solid black', textAlign: 'center'}}>
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
