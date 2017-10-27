import React     from 'react';
import PropTypes from 'prop-types';

import {
  coordsFromParams,
  coordString,
  save,
  load,
} from './helpers';

const propTypes = {
  size: PropTypes.string.required,
}

class Asteroid extends React.Component {
  constructor(props) {
    super(props);
  }

  coordsFromShip() {
    // const size    = this.props.size;
    // const tileX   = this.coords.x;
    // const tileY   = this.coords.y;
    // const offsetX = this.props.offsetX;
    // const offsetY = this.props.offsetY;
    // return {
    //   x: (size * tileX) - (size / 2) - offsetX,
    //   y: (size * tileY) - (size / 2) - offsetY,
    // };
  }

  render() {
    const { x, y, size, description } = this.props;

    const pixels = {
      meteoroid: 10,
      minor:     30,
      medium:    50,
      large:     100,
      planetoid: 500,
    };

    const dimensionPx = pixels[size];
    const modifierPx  = dimensionPx / 3;

    const asteroidStyle = {
      position:        'absolute',
      top:             `${y}%`,
      left:            `${x}%`,
      width:           `${dimensionPx}px`,
      height:          `${dimensionPx}px`,
      color:           '#111',
      backgroundColor: 'gray',
      borderRadius:    `${modifierPx}px`,
      zIndex:          '0',
      boxShadow:       `inset 0 0 ${modifierPx}px black`,
    };

    return (
      <div className="asteroid" style={asteroidStyle}>
        &nbsp;*•&nbsp;&nbsp;°&nbsp;O<br/>
        •&nbsp;&nbsp;o&nbsp;&nbsp;*&nbsp;•<br/>
        &nbsp;&nbsp;*&nbsp;•&nbsp;°
      </div>
    );
  }
}

Asteroid.propTypes = propTypes;

export default Asteroid;