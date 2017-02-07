import React, { Component, PropTypes } from 'react';

class Board extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.arrayOf(PropTypes.element),
    ]).isRequired,
  };

  render() {
    return (
      <div style={{ top: 0, left: 0, padding: 0 }}>
        <img src="../res/ludoboard-fit.png" style={{ width: '900px' }} alt="board" />
        {this.props.children}
      </div>
    );
  }
}

export default Board;
