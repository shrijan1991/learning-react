
const initialState = () => {
  const arr = new Array(8);
  for (let i = 0; i < arr.length; i += 1) {
    arr[i] = new Array(10).fill(null);
  }
  return ({
    occupiedSpaces: arr,
    currentPlayer: 0,
    victor: false,
  });
};

export default initialState;
