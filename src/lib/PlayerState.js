class PlayerState {
  constructor() {
    this.positions = [-1, -1, -1, -1];
  }

  needsOne() {
    return this.positions.every(pos => pos === -1);
  }

  hasChoice(number) {
    const lim = 57 - number;
    const outs = this.positions.map((pos, idx) => (pos === -1 ? null : idx))
                    .filter(n => ((n !== null) && (n < this.lim)));

    if (outs.length < 4 && number === 1) {
      outs.push(this.positions.findIndex(pos => pos === -1));
      return outs;
    }

    return outs;
  }

  update(number, goti) {
    this.positions[goti] = ((this.positions[goti] + number) < 57) ? (this.positions[goti] + number) : this.positions[goti];
  }

  getPositions() {
    return this.positions;
  }
}

export default PlayerState;
