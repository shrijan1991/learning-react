const winCond = [[0, 1, 2],
  [0, 3, 6],
  [3, 4, 5],
  [6, 7, 8],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function checkVictory(playerSpaces) {
  for (let i = 0; i < winCond.length; i += 1) {
    let count = 0;
    for (let j = 0; j < 3; j += 1) {
      if (playerSpaces.includes(winCond[i][j])) {
        count += 1;
        if (count > 2) {
          return true;
        }
      }
    }
  }
  return false;
}

function playertwo(player1Spaces, player2Spaces) {

  // Min
  if (player1Spaces.length > 1) {
    for (let i = 0; i < winCond.length; i += 1) {
      let count = 0;
      let lastUnmatched = -1;

      for (let j = 0; j < 3; j += 1) {
        if (player1Spaces.includes(winCond[i][j])) {
          count += 1;
          if (count === 2 && (j + 1) < 3 && !(player2Spaces.includes(winCond[i][j + 1]))) {
            return winCond[i][j + 1];
          } else if (count === 2 && !(player2Spaces.includes(winCond[i][lastUnmatched]))) {
            return winCond[i][lastUnmatched];
          }
        } else {
          lastUnmatched = j;
        }
      }
    }
  }

  let player2possibleVictories = player2Spaces
  .map(n => winCond.filter(val => val.includes(n)));
  // console.log(player2possibleVictories);
  let player2betterchances = [];
  for (let i = 0; i < player2possibleVictories.length; i += 1) {
    let seqMatch = 0;
    for(let j= 0; j < 3; j++) {
      // //console.log(player2possibleVictories);
    }
    if (seqMatch) {
      player2betterchances.push(player2possibleVictories[i]);
    }
  }
  // console.log(player2betterchances);

  if (player2betterchances.length > 0) {
    return player2betterchances[0][2];
  } else if (player2possibleVictories.length > 0) {
    return player2possibleVictories[0][1];
  }
  return 2;
}

export { checkVictory, playertwo };
