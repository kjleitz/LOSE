import React     from 'react';
import PropTypes from 'prop-types';
import InfoBox   from './info_box';

import {
  coordsFromParams,
  coordString,
  save,
  load,
} from './helpers';

const propTypes = {
  x:                  PropTypes.number.isRequired,
  y:                  PropTypes.number.isRequired,
  angle:              PropTypes.number.isRequired,
  tileSize:           PropTypes.number.isRequired,
  tileRelativeCoords: PropTypes.object.isRequired,
  size:               PropTypes.string.isRequired,
  description:        PropTypes.string.isRequired,
  inventory:          PropTypes.array.isRequired,
}

class Asteroid extends React.Component {
  constructor(props) {
    super(props);

    this.astSize        = this.astSize.bind(this);
    this.coordsToShip   = this.coordsToShip.bind(this);
    this.isTouchingShip = this.isTouchingShip.bind(this);

    this.state = {
      isTouchingShip: this.isTouchingShip(),
    };
  }

  componentWillReceiveProps(nextProps) {
    const currentTouchStatus = this.isTouchingShip();
    if (this.state.isTouchingShip === currentTouchStatus) return;
    this.setState({ isTouchingShip: currentTouchStatus });
  }

  astSize() {
    const pixels = {
      meteoroid: 10,
      minor:     30,
      medium:    50,
      large:     100,
      planetoid: 500,
    };

    return pixels[this.props.size];
  }

  coordsToShip() {
    const baseX    = this.props.tileRelativeCoords.x;
    const baseY    = this.props.tileRelativeCoords.y;
    const percentX = this.props.x / 100;
    const percentY = this.props.y / 100;
    const tileSize = this.props.tileSize;

    return {
      x: baseX + (percentX * tileSize) + (this.astSize() / 2),
      y: baseY + (percentY * tileSize) + (this.astSize() / 2),
    }
  }

  isTouchingShip() {
    const { x, y } = this.coordsToShip();
    const halfSize = this.astSize() / 2;
    if (Math.abs(x) <= halfSize && Math.abs(y) <= halfSize) return true;
    return false
  }

  render() {
    const { x, y, size, description, inventory, angle } = this.props;
    const { isTouchingShip } = this.state;
    const dimensionPx  = this.astSize();
    const modifierPx   = dimensionPx / 3;
    const infoBoxTitle = `${size} asteroid`;

    const asteroidStyle = {
      position:        'absolute',
      bottom:          `${y}%`,
      left:            `${x}%`,
      width:           `${dimensionPx}px`,
      height:          `${dimensionPx}px`,
      color:           '#111',
      backgroundColor: isTouchingShip ? '#E6FFED' : 'gray',
      borderRadius:    `${modifierPx}px`,
      zIndex:          '1',
      boxShadow:       `inset 0 0 ${modifierPx}px black`,
    };

    return (
      <div className="asteroid" style={asteroidStyle}>
        &nbsp;*•&nbsp;&nbsp;°&nbsp;O<br/>
        •&nbsp;&nbsp;o&nbsp;&nbsp;*&nbsp;•<br/>
        &nbsp;&nbsp;*&nbsp;•&nbsp;°
        <InfoBox
          visible={isTouchingShip}
          title={infoBoxTitle}
          description={description}
          inventory={inventory}
          angle={angle}
        />
      </div>
    );
  }
}

Asteroid.propTypes = propTypes;

export default Asteroid;