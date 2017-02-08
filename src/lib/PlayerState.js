import { safeDistances } from './CellMap';
import Path from './Path';

class PlayerState {
  constructor(id) {
    this.id = id;
    this.positions = [56, 56, 56, 53];
  }

  needsOne() {
    return this.positions.filter(filled => filled !== 56).every(pos => pos === -1);
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


  update(number, goti, allPlayers) {
    const playersState = allPlayers;
    const opponents = playersState.filter(p => p !== this);



    if (number === -1) {
      this.positions[goti] = -1;
      return;
    }
    this.positions[goti] = ((this.positions[goti] + number) < 57) ? (this.positions[goti] + number) : this.positions[goti];
    const newposition = this.positions[goti];

    if(this.positions.filter(n => n === 56).length === 4) {
      alert(this.id.toUpperCase() + " is Victorious.");
    }
    // dhoos logic
    const currentCoordinate = Path.getCoordinate(this.id, newposition, goti);

    if (!safeDistances.includes(newposition)) {
      for (let i = 0; i < 3; i++) {
        opponents[i].getPositions()
        .map((num, idx) =>
        (Path.getCoordinate(opponents[i].id, num, idx).x === currentCoordinate.x &&
        Path.getCoordinate(opponents[i].id, num, idx).y === currentCoordinate.y) ? idx : null)
        .filter(index => index !== null)
        .forEach(deported => opponents[i].update(-1, deported, playersState));
      }
    }
  }

  getPositions() {
    return this.positions;
  }
}

export default PlayerState;
