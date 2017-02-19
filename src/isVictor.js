const DIRECTIONS = [[1, 0], [0, 1], [1, -1], [1, 1]];

const isVictor = (occupiedSpaces, x, y) => {
  const check = occupiedSpaces[x][y];
  console.log(check);
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

export default isVictor;
