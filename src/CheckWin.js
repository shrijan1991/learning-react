const winCond = [[0, 1, 2],
  [0, 3, 6],
  [3, 4, 5],
  [6, 7, 8],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let minmaxresults = [];
function checkVictory(playerSpaces, num) {
  const possibleWinConditions = winCond
  .map(vic => vic.includes(num) ? vic : null)
  .filter(n => n !== null);

  for (let i = 0; i < possibleWinConditions.length; i += 1) {
    let count = 0;
    for (let j = 0; j < 3; j += 1) {
      if (playerSpaces.includes(possibleWinConditions[i][j])) {
        count += 1;
        if (count > 2) {
          return true;
        }
      }
    }
  }
  return false;
}

function playertwo(player1Spaces, player2Spaces, availableSpaces) {

  // if (player1Spaces.length > 1) {
  //   for (let i = 0; i < winCond.length; i += 1) {
  //     let count = 0;
  //     let lastUnmatched = -1;
  //     for (let j = 0; j < 3; j += 1) {
  //       if (player1Spaces.includes(winCond[i][j])) {
  //         count += 1;
  //         if (count === 2 && (j + 1) < 3 && !(player2Spaces.includes(winCond[i][j + 1]))) {
  //           return winCond[i][j + 1];
  //         } else if (count === 2 && !(player2Spaces.includes(winCond[i][lastUnmatched]))) {
  //           return winCond[i][lastUnmatched];
  //         }
  //       } else {
  //         lastUnmatched = j;
  //       }
  //     }
  //   }
  // }

  const maxvalue = minmax(player2Spaces, player1Spaces, availableSpaces, 0, 1);
  return availableSpaces[maxvalue];
  // console.log(minmaxresults);

  // minmaxresults = [];

  // let player2possibleVictories = player2Spaces
  // .map(n => winCond.filter(val => val.includes(n)));
  // // console.log(player2possibleVictories);
  // let player2betterchances = [];
  // for (let i = 0; i < player2possibleVictories.length; i += 1) {
  //   let seqMatch = 0;
  //   for(let j= 0; j < 3; j++) {
  //     // //console.log(player2possibleVictories);
  //   }
  //   if (seqMatch) {
  //     player2betterchances.push(player2possibleVictories[i]);
  //   }
  // }
  // console.log(player2betterchances);

  // if (player2betterchances.length > 0) {
  //   return player2betterchances[0][2];
  // } else if (player2possibleVictories.length > 0) {
  //   return player2possibleVictories[0][1];
  // }
}

function minmax(botSpaces, playerSpaces, availableSpaces, depth, currentPlayer) {
  if (availableSpaces.length > 0 && depth < 9) {
    // Maximizer's turn
    if (currentPlayer === 1) {
      const maximizer = [];
      if (checkVictory(botSpaces, botSpaces[botSpaces.length - 1])) {
        return 10 - depth;
      }
      for (let i = 0; i < availableSpaces.length; i += 1) {
        botSpaces.push(availableSpaces[i]);
        const Spaces = botSpaces.slice();
        const newavailSpaces = availableSpaces.filter((n,idx) => (idx !== i));
        maximizer.push(minmax(Spaces, playerSpaces, newavailSpaces, depth + 1, (currentPlayer + 1) % 2));
        botSpaces.pop(availableSpaces[i]);
      }
      // console.log(maximizer, depth + 1);
      if (depth === 0) {
        const maximumValue = maximizer.slice();
        const maximumnode = maximizer.indexOf(maximumValue.sort()[maximizer.length - 1]);
        // console.log(maximizer,maximumnode);
        return maximumnode;
      }
      minmaxresults.push('Maximizer', depth, maximizer.length);
      return maximizer.sort()[maximizer.length - 1];
  // Minimizer's turn
    } else {
      const minimizer = [];
      if (checkVictory(playerSpaces, playerSpaces[playerSpaces.length - 1])) {
        return depth - 10;
      }
      for (let i = 0; i < availableSpaces.length; i += 1) {
        playerSpaces.push(availableSpaces[i]);
        const Spaces = playerSpaces.slice();
        const newavailSpaces = availableSpaces.filter((n,idx) => (idx !== i));
        minimizer.push(minmax(botSpaces, Spaces, newavailSpaces, depth + 1, (currentPlayer + 1) % 2));
        playerSpaces.pop(availableSpaces[i]);
      }
      if (depth === 1) {
        // const maximumnode = maximizer.reduce((max, num) => (max > num) ? max : num);
        // console.log(minimizer);
      }
      minmaxresults.push('Minimizer', depth, minimizer.length);
      // console.log(minimizer, depth + 1);
      return minimizer.sort()[0];
    }
  }
  return 0;
}

export { checkVictory, playertwo };
