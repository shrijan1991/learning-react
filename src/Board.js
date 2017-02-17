import React, { Component } from 'react';
import { createStore } from 'redux';
import ReactDOM from 'react-dom';
import WelcomeScreen from './Welcome';


const newGame = () => {
  const arr = new Array(8);
  for (let i = 0; i < 8; i += 1) {
    arr[i] = new Array(10).fill(null);
  }
  const primarySpace = [];
  primarySpace.push(arr);

  return {
    occupiedSpaces: primarySpace,
    currentPlayer: 0,
    currentMove: 0,
  };
};

const clickedButton = (xcoor, ycoor) => {
  return {
    type: 'SELECT_SPACE',
    dim: {
      x: xcoor,
      y: ycoor,
    },
  };
};

const startGame = () => {
  return {
    type: 'RESTART_GAME',
  };
};

const DIRECTIONS = [[1, 0], [0, 1], [1, -1], [1, 1]];

const isVictor = (occupiedSpaces, x, y) => {
  const check = occupiedSpaces[x][y];
  return DIRECTIONS.find((n) => {
    let count = 1;
    for (let sign = -1; sign <= 1; sign += 2) {
      const dx = n[0] * sign;
      const dy = n[1] * sign;
      let cx = x + dx;
      let cy = y + dy;
      while (cx > -1 && cy > -1 && cx < 8 && cy < 10) {
        if (occupiedSpaces[cx][cy] === check) {
          count += 1;
          if (count > 3) {
            return true;
          }
        } else {
          break;
        }
        cx += dx;
        cy += dy;
      }
    }
  });
};

const occupySpace = (occupiedSpaces, x, y, currentPlayer, currentMove) => {
  const newOccSpaces = occupiedSpaces[currentMove].slice();
  newOccSpaces[x][y] = currentPlayer;
  occupiedSpaces.push(newOccSpaces);

  return occupiedSpaces;
};

const reducer = (state = newGame(), action) => {
  switch (action.type) {
    case 'SELECT_SPACE':
      const newOccSpaces = occupySpace(state.occupiedSpaces, action.dim.x, action.dim.y, state.currentPlayer, state.currentMove);
      return isVictor(newOccSpaces[state.currentMove], action.dim.x, action.dim.y) ? {
        occupiedSpaces: newOccSpaces,
        currentPlayer: (state.currentPlayer + 1) % 2,
        currentMove: state.currentMove + 1,
        victor: state.currentPlayer,
      } : {
        occupiedSpaces: newOccSpaces,
        currentPlayer: (state.currentPlayer + 1) % 2,
        currentMove: state.currentMove + 1,
      };
    case 'RESTART_GAME':
      return newGame();
    default:
      return state;
  }
};

const store = createStore(reducer);


class Board extends Component {
  render() {
    const state = store.getState();
    if (state.victor === 1 || state.victor === 0) {
      const message = `Player ${state.victor + 1} is victorious.`;
      return <WelcomeScreen message={message} start={() => store.dispatch(startGame())} />;
    }
    const playermsg = `Player ${state.currentPlayer + 1}'s turn`;
    console.log(state);
    return (
      <div>
        <div style={{ display: 'inline-block', width: '800px' }}>
          {state.occupiedSpaces[state.currentMove].map((row, index) =>
          <Cells key={index} row={row} num={index} onClick={(x, y) => store.dispatch(clickedButton(x, y))} />)}
        </div>
        <div style={{ display: 'inline-block', width: '40px', height: '640px' }}>
          {playermsg}
          <div>
            <img src='../res/back.jpg' style={{ paddingTop: '40px' }} />
            <img src='../res/front.jpg' style={{ paddingTop: '40px' }} />
          </div>
        </div>
      </div>
    );
  }
}

const Circle = (props) => {
  return (
    <svg height="80" width="80">
      <circle cx="40" cy="40" r="30" stroke="black" fill={props.color} />
    </svg>
  );
}

const Cells = (props) => {
  const rowno = props.num;
  const cell = props.row.map((n, idx) => {
    if (n === 0) {
      return (
      <div key={idx} className="box"
      style={{position: 'absolute', left: idx * 80, top: rowno * 80 }}>
        <Circle color="blue" />
      </div>
      );
    } else if (n === 1) {
      return (
      <div key={idx} className="box"
      style={{position: 'absolute', left: idx * 80, top: rowno * 80 }}>
        <Circle color="green" />
      </div>
      );
    } else {
      return (
      <div key={idx} className="box"
      style={{position: 'absolute', left: idx * 80, top: rowno * 80 }}
      onClick={() => props.onClick(rowno,idx)}>
        <Circle color="white" />
      </div>
      );
    }
  });
  return <div>{cell}</div>;
};

const render = () => {
  ReactDOM.render(<Board />, document.getElementById("root"));
};

store.subscribe(render);

export default Board;
