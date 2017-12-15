import React from 'react';

const Star = props => (
  <span
    style={{
      position: 'absolute',
      top:      `${props.y}%`,
      left:     `${props.x}%`,
      color:    '#BBB',
    }}
  >
    *
  </span>
);

export default Star;
