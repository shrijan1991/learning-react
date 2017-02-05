import React, { Component } from 'react';

class Dice extends Component {
  state = {
    number: null
  };

  roll = () => {
    const number = Math.floor(Math.random() * 6) + 1;
    this.setState({
      number: number,
    });
    this.props.onRoll(number);
  }

  render() {
    const number = this.state.number;
    const { currentPlayer } = this.props;

    return (
      <div style={{
        background: 'yellow',
        textAlign: 'center',
        padding: 10,
        fontSize: 18,
      }} onClick={this.roll}>{number === null ? 'Roll Dice' : `${currentPlayer.color.toUpperCase()} rolled ${number}`}</div>
    );
  }
}

export default Dice;
