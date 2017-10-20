import React from 'react';
import Ship  from './ship';

export default class MainShip extends React.Component {
  render() {
    return (
      <Ship
        player={this.props.player}
        moveDirection={this.props.moveDirection}
        style={{
          position:        'fixed',
          top:             'calc(50% - 15px)',
          left:            'calc(50% - 15px)',
          zIndex:          '10',
          width:           '30px',
          height:          '30px',
          borderRadius:    '15px 15px 0 0',
          backgroundColor: 'green',
          borderBottom:    '5px solid red',
        }}
      />
    )
  }
}