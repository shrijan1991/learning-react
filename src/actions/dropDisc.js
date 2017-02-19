const dropDisc = column => (dispatch, getState) => {
  const spaces = getState().occupiedSpaces;
  for (let rowNum = spaces.length - 1; rowNum >= 0; rowNum -= 1) {
    const row = spaces[rowNum];
    if (row[column] === null) {
      return dispatch({
        type: 'SELECT_SPACE',
        payload: {
          row: rowNum,
          col: column,
        },
      });
    }
  }

  return dispatch({
    type: 'BEEP',
  });
};

export default dropDisc;
