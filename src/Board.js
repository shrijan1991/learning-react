import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Cells from './Cells';
import newGame from './actions/newGame';




class Board extends Component {
  render() {
    const { occupiedSpaces, victor, currentPlayer, onClick } = this.props;
    const winner = currentPlayer === 0 ? 2 : 1;
    const playermsg = victor ? `Player ${winner} is victorious` :
                               `Player ${currentPlayer + 1}'s turn`;

    return (
      <div>
        <div style={{ display: 'inline-block', width: '800px' }}>
          {occupiedSpaces.map((row, index) =>
            <Cells key={index} row={row} rownumber={index} />)}
        </div>
        <div style={{ display: 'inline-block', width: '40px', height: '640px' }}>
          {playermsg}
          <div>
            <img src="../res/restart.png" onClick={onClick} style={{ paddingTop: '40px' }} />
          </div>
        </div>
      </div>
    );
  }
}

Board.propTypes = {
  occupiedSpaces: PropTypes.array,
  victor: PropTypes.bool.isRequired,
  currentPlayer: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  occupiedSpaces: state.occupiedSpaces,
  victor: state.victor,
  currentPlayer: state.currentPlayer,
});

const mapDispatchToProps = dispatch => ({
  onClick: () => dispatch(newGame()),
});


export default connect(mapStateToProps, mapDispatchToProps)(Board);
