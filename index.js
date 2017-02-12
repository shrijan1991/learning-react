import React, { Component } from 'react';
import { render } from 'react-dom';

import Board from './src/Board';
import Cells from './src/Cells';

class App extends Component {
  render  () {
    return (
        <div>
          <Board />
          <Cells />
        </div>
    );
  }
}

render(<App/>, document.getElementById('rootFile'));