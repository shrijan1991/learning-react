const bases = {
  red: [[11.5, 1.5], [12.5, 2.5], [11.5, 3.5], [10.5, 2.5]],
  blue: [[11.5, 10.5], [12.5, 11.5], [11.5, 12.5], [10.5, 11.5]],
  yellow: [[2.5, 10.5], [3.5, 11.5], [2.5, 12.5], [1.5, 11.5]],
  green: [[2.5, 1.5], [3.5, 2.5], [2.5, 3.5], [1.5, 2.5]],
};

const homes = {
  red: [7, 6],
  blue: [8, 7],
  yellow: [7, 8],
  green: [6, 7],
};

const safeDistances = [8, 13, 21, 26, 34, 39, 47, 51, 52, 53, 54, 55, 56];

const dhusDistance = {
  red: {
    blue: 13,
    yellow: 26,
    green: 39,
  },
  blue: {
    yellow: 13,
    green: 26,
    red: 39,
  },
  green: {
    red: 13,
    blue: 26,
    yellow: 39,
  },
};

export { bases, homes, safeDistances, dhusDistance };
