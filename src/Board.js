import React, { Component } from 'react';
import Players from './Players';

const paths = require('./Paths.js')



class Board extends Component {

 renderPlayer(player, idx,w,h) {
   console.log(h, w);
    return <div key={idx} style={{position:'absolute', background: player.color, width: 10, height: 10, top:h, left:w ,border:'solid black'}} />;
  }


  render() {
    const players = this.props.players;
    const red = paths()[1];
    const pos = players[0].pos;
    console.log(pos);
    console.log(red[pos]);
    
    return (  
      <div style={{top:0,left: 0 ,padding:0}}>
        <img src='../res/ludo-chopped.png' style={{width: '860px',height:'640px'}} id="ludo"/>
        {this.renderPlayer(players[0],1,(red [pos] [0] *840/15)+15,(red[pos][1]*620/15)+15)}
      </div>
    )
  }
}

export default Board;
