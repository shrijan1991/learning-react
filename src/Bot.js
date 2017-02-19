
const MIN = -1000;
const MAX = 1000;



const availableMoves = (occupiedSpaces) => {
  const moves = [];
  for (let y = 0; y < 10; y += 1) {
    let x = 7;
    while (x > -1 && occupiedSpaces[x][y] !== null) {
      x -= 1;
    }
    if (x > -1) {
      moves.push([x, y]);
    }
  }
  return moves;
};






function botLogic( occupiedSpaces, depth, maximizingPlayer, currentMove, alpha, beta) {
    // Terminating condition. when a player is victorious
  if (isVictor(occupiedSpaces, currentMove[0], currentMove[1])) {
    return maximizingPlayer ? 20 - depth : depth - 20;
  }

  if (maximizingPlayer) {
    let best = MIN;
    const possibleMoves = availableMoves(occupiedSpaces);
    for (let i = 0; i < possibleMoves.length; i += 1) {
      const newMove = occupySpace(occupiedSpaces, possibleMoves[i][0], possibleMoves[i][1], 1);
      const val = botLogic(newMove, depth + 1, false, possibleMoves[i], alpha, beta);
      best = Math.max(best, val);
      alpha = Math.max(alpha, best);

      if (beta <= alpha) {
        break;
      }
    }
    return best;
  } else {
    let best = MAX;
    const possibleMoves = availableMoves(occupiedSpaces);
    for (let i = 0; i < possibleMoves.length; i += 1) {
      const newMove = occupySpace(occupiedSpaces, possibleMoves[i][0], possibleMoves[i][1], 0);
      const val = botLogic(newMove, depth + 1, true, possibleMoves[i], alpha, beta);
      best = Math.min(best, val);
      beta = Math.min(beta, best);

      if (beta <= alpha) {
        break;
      }
    }
    return best;
  }
}

function getMove(occupiedSpaces) {
  console.log(alphaBeta(occupiedSpaces, 0, true, [0, 0], MIN, MAX));
}

export { isVictor, occupySpace, getMove };


