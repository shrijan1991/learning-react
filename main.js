import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import Board from './src/Board';
import WelcomeScreen from './src/Welcome';

import store from './src/configureStore';

class Main extends Component {
  state = {
    started: false,
  };

  render() {
    const { started } = this.state;

    return (
      <Provider store={store}>
        <div>
          {!started && <WelcomeScreen onStart={() => this.setState({ started: true })} /> }
          {started && <Board />}
        </div>
      </Provider>
    );
  }
}

ReactDOM.render(<Main />, document.getElementById('root'));
