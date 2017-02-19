import initialState from './initialState';
import isVictor from './isVictor';

const occupySpace = (original, toRow, toColumn, player) => (
  original.map((row, rowNum) => (
    row.map((value, colNum) => (
      toRow === rowNum && toColumn === colNum ? player : value
    ))
  ))
);

const rootReducer = (state = initialState(), action) => {
  switch (action.type) {
    case 'SELECT_SPACE':
      const newSpace = occupySpace(state.occupiedSpaces, action.payload.row,
          action.payload.col, state.currentPlayer);
      return {
        occupiedSpaces: newSpace,
        currentPlayer: (state.currentPlayer + 1) % 2,
        victor:
          isVictor(newSpace, action.payload.row,
          action.payload.col),
      };

    case 'NEW_GAME':
      return initialState();

    default:
      return state;
  }
};

export default rootReducer;
