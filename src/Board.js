import React, { Component } from 'react';
import { createStore } from 'redux';
import ReactDOM from 'react-dom';


const newGame = () => {
  const arr = new Array(6);
  for (let i = 0; i < 6; i += 1) {
    arr[i] = new Array(5).fill(null);
  }

  return {
    occupiedSpaces: arr,
    currentPlayer: 0,
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


const occupySpace = (occupiedSpaces, x, y, currentPlayer) => {
  return occupiedSpaces[x][y], currentPlayer, occupiedSpaces[x][y+1];
};

const reducer = (state = newGame(), action) => {
  switch (action.type) {
    case 'SELECT_SPACE':
      return {
        occupiedSpaces: occupySpace(state.occupiedSpaces, action.dim.x, action.dim.y, state.currentPlayer),
        currentPlayer: (state.currentPlayer + 1) % 2,
      };
    case 'RESTART_GAME':
      return newGame;
    default:
      return state;
  }
};

const store = createStore(reducer);


class Board extends Component {
  render() {
    console.log(store.getState().occupiedSpaces);
    return (
      <div>
        {store.getState().occupiedSpaces.map((row, index) => <Cells key={index} row={row} num={index}/>)}
      </div>
    );
  }
}

//onClick={store.dispatch(clickedButton(index, 0))}

const Cells = (props) => {
  const some = props.num;
  const cell = props.row.map((n, idx) => <div key={idx} className="box" style={{position:'absolute',left:idx*30,top:some*30}}></div>);
  console.log(some);

  return <div>{cell}</div>;
};
// onClick={() => props.onClick(idx)}

const render = () => {
  ReactDOM.render(<Board />, document.createElement("root"));
};

store.subscribe(render);

export default Board;
