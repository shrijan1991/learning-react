import React, {Component} from 'react';

class Players extends Component{
  render(){
  const index = this.props.index;
  const player =  this.props.player;

  return (
    <svg height="12" width="12" >
      <circle cx="6" cy="6" r="6" fill= {player.color} key = {index}/>
    </svg>
    
  )
  };
}

export default Players;