import React, { Component } from 'react';

function Board() {
  return (
    <div style={{ position: 'absolute' }} >
      <img src="../res/tic-tac-toe.gif" alt="" /><p />
      <button className="Reset" />
    </div>
  );
}
export default Board;
