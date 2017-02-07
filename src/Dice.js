import React, { Component, PropTypes } from 'react';

class Dice extends Component {
  static propTypes = {
    onRoll: PropTypes.func.isRequired,
    caption: PropTypes.string.isRequired,
  };

  state = {
    number: null,
  };

  roll = () => {
    if (this.state.number !== null) {
      return;
    }

    const number = Math.floor(Math.random() * 10) + 1;
    this.setState({
      number,
    });
    this.props.onRoll(number, () => {
      this.setState({
        number: null,
      });
    });
  }

  render() {
    const { number } = this.state;
    const { caption } = this.props;

    return (
      <button
        style={{
          background: caption,
          textAlign: 'center',
          padding: 10,
          fontSize: 18,
        }} onClick={this.roll}
      >
        {number === null ?
          `${caption.toUpperCase()}: Roll Dice` :
          `${caption.toUpperCase()} rolled ${number}`}
      </button>
    );
  }
}

export default Dice;
