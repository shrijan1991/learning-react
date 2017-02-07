import { bases, homes } from './CellMap';

const CELL_WIDTH = 62;
const CELL_HEIGHT = 62;

function transpose(src) {
  return src.map(point => [14 - point[1], point[0]]);
}

function generateStart(initialPosition, direction) {
  const path = [];
  const pos = initialPosition.slice();

  for (let i = 0; i < 4; i += 1) {
    path.push(pos.slice());
    pos[0] += direction[0];
    pos[1] += direction[1];
  }

  return path;
}

function generateEnd(initialPosition, direction) {
  const path = [];
  const pos = initialPosition.slice();
  for (let i = 0; i < 5; i += 1) {
    path.push(pos.slice());
    pos[0] += direction[0];
    pos[1] += direction[1];
  }
  path.push(pos.slice());
  pos[0] += direction[2];
  pos[1] += direction[3];
  for (let i = 0; i < 6; i += 1) {
    path.push(pos.slice());
    pos[0] -= direction[0];
    pos[1] -= direction[1];
  }
  return path;
}

function generateCommon(initialPosition, direction) {
  const pos = initialPosition.slice();
  const path = [];
  for (let i = 0; i < 5; i += 1) {
    path.push(pos.slice());
    pos[0] += direction[0];
    pos[1] += direction[1];
  }
  for (let i = 0; i < 2; i += 1) {
    path.push(pos.slice());
    pos[0] += direction[2];
    pos[1] += direction[3];
  }
  for (let i = 0; i < 5; i += 1) {
    path.push(pos.slice());
    pos[0] -= direction[0];
    pos[1] -= direction[1];
  }
  path.push(pos.slice());
  return path;
}

const paths = {};
paths.red = [[8, 1]];

paths.red = paths.red.concat(generateStart([8, 1], [0, 1]));
paths.red = paths.red.concat(generateCommon([9, 6], [1, 0, 0, 1]));
paths.red = paths.red.concat(generateCommon([8, 9], [0, 1, -1, 0]));
paths.red = paths.red.concat(generateCommon([5, 8], [-1, 0, 0, -1]));
paths.red = paths.red.concat(generateEnd([6, 5], [0, -1, 1, 0]));

paths.blue = transpose(paths.red);
paths.yellow = transpose(paths.blue);
paths.green = transpose(paths.yellow);

const Path = {
  getCoordinate: (playerId, position, gotiNumber) => {
    if (position === -1) {
      const p = bases[playerId][gotiNumber];
      return {
        x: p[0] * CELL_WIDTH,
        y: p[1] * CELL_HEIGHT,
      };
    }

    const pos = paths[playerId][position];
    return {
      x: pos[0] * CELL_WIDTH,
      y: pos[1] * CELL_HEIGHT,
    };
  },
};

export default Path;
