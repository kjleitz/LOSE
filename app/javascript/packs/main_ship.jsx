import React from 'react';
import Ship  from './ship';

export default class MainShip extends React.Component {
  render() {
    return (
      <Ship
        player={this.props.player}
        style={{
          position:        'fixed',
          top:             '185px',
          left:            '185px',
          width:           '30px',
          height:          '30px',
          borderRadius:    '15px 15px 0 0',
          backgroundColor: 'green',
          borderBottom:    '5px solid red',
          transform:       `rotate(${this.props.angle * -1}deg)`,
          transition:      'transform 0.1s ease-out'
        }}
      />
    )
  }
}