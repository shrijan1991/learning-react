import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import dropDisc from './actions/dropDisc';

const Circle = ({ rowno, colno, onClick, color }) => (
  <div className="circle" onClick={() => onClick(colno)} style={{ left: colno * 80, top: rowno * 80 }}>
    <svg
      height="80" width="80"
    >
      <circle cx="40" cy="40" r="30" stroke="black" fill={color} />
    </svg>
  </div>
);

const mapDispatchToDrops = dispatch => ({
  onClick: column => dispatch(dropDisc(column)),
});

const MappedCircle = connect(null, mapDispatchToDrops)(Circle);

Circle.propTypes = {
  color: PropTypes.string.isRequired,
  colno: PropTypes.number.isRequired,
  rowno: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
};


const Cells = (props) => {
  const rowno = props.rownumber;
  const cell = props.row.map((n, idx) => {
    let color = 'white';
    if (n === 0) {
      color = 'blue';
    } else if (n === 1) {
      color = 'green';
    }
    return (
      <MappedCircle key={idx} color={color} rowno={rowno} colno={idx} />
    );
  });
  return <div>{cell}</div>;
};

Cells.propTypes = {
  rownumber: PropTypes.number.isRequired,
  row: PropTypes.array,
};



export default Cells;
