import React, { Component, PropTypes } from 'react';
import Path from './lib/Path';

class Player extends Component {
  static propTypes = {
    id: PropTypes.oneOf(['red', 'blue', 'yellow', 'green']).isRequired,
    color: PropTypes.string.isRequired,
    gotis: PropTypes.arrayOf(PropTypes.number).isRequired,
    chooseGoti: PropTypes.arrayOf(PropTypes.number),
    onGotiChosen: PropTypes.func.isRequired,
  };

  static defaultProps = {
    chooseGoti: null,
  };

  renderGoti = (coordinate, idx) => {
    const { color, chooseGoti, onGotiChosen } = this.props;

    const style = {
      backgroundColor: color,
      left: coordinate.x,
      top: coordinate.y,
    };
    if (chooseGoti && chooseGoti.length > 0 && chooseGoti.indexOf(idx) > -1) {
      return <button key={idx} className="goti" style={style} onClick={() => onGotiChosen(idx)}  />;
    }

    return <div key={idx} className="goti" style={style} />;
  }

  render() {
    const { id, gotis } = this.props;

    return (
      <div style={{ position: 'absolute', left: 0, top: 0 }}>
        { gotis.map((goti, idx) => Path.getCoordinate(id, goti, idx)).map(this.renderGoti) }
      </div>
    );
  }
}

export default Player;
