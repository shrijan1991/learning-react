import React, { PropTypes } from 'react';

const Header = 'Welcome to 4-of-a-kind!';

const WelcomeScreen = ({ onStart }) => (
  <div className="welcome">
    <p className="welcomeText">{Header}</p>
    <img
      alt=""
      src="../res/Play_Now_Button.gif"
      style={{ position: 'absolute', align: 'middle', top: '80px', left: '120px' }}
      onClick={onStart}
    />
  </div>
);

WelcomeScreen.propTypes = {
  onStart: PropTypes.func.isRequired,
};

export default WelcomeScreen ;
