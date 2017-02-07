class PlayerState {
  constructor() {
    this.positions = [52, -1, -1, -1];
  }

  needsOne() {
    return this.positions.filter(filled => filled != 56).every(pos => pos === -1);
  }

  hasChoice(number) {
    const outs = this.positions.map((pos, idx) => ((pos === -1 || pos === 56 || (pos + number) > 56) ? null : idx))
                  .filter(n => n !== null);

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
