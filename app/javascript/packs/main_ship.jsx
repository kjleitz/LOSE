import React     from 'react';
import PropTypes from 'prop-types';
import Ship      from './ship';

const propTypes = {
  player:        PropTypes.object.isRequired,
  angle:         PropTypes.number.isRequired,
  moveDirection: PropTypes.string,
  shipX:         PropTypes.number.isRequired,
  shipY:         PropTypes.number.isRequired,
};

class MainShip extends React.Component {
  render() {
    return (
      <Ship
        player={this.props.player}
        moveDirection={this.props.moveDirection}
        launchRocket={this.props.launchRocket}
        style={{
          position:        'absolute',
          left:            `calc(${this.props.shipX}px - 15px)`,
          bottom:          `calc(${this.props.shipY}px - 15px)`,
          transform:       `rotate(${this.props.angle}deg)`,
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

MainShip.propTypes = propTypes;

export default MainShip;
