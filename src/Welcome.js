import React from 'react';

const WelcomeScreen = (props) => {
  return (
    <div className="welcome" >
        <p className="welcomeText">{props.message}</p>
        <img src='../res/Play_Now_Button.gif' style={{ position: 'absolute', align: 'middle', top: '80px', left: '120px' }} onClick={props.start}/>
    </div>
  );
};

export  default WelcomeScreen ;
