import React       from 'react';
import PropTypes   from 'prop-types';
import appConfig   from './app_config';
import CoordsLabel from './coords_label'
import InfoBox     from './info_box';
import messageBus  from './message_bus';

import {
  coordsFromParams,
  coordString,
  save,
  load,
} from './helpers';

const propTypes = {
  x:                  PropTypes.number.isRequired,
  y:                  PropTypes.number.isRequired,
  tileEgo:            PropTypes.string.isRequired,
  tileRelativeCoords: PropTypes.object.isRequired,
  tileScaledCoords:   PropTypes.object.isRequired,
  tileSize:           PropTypes.number.isRequired,
  size:               PropTypes.string.isRequired,
  description:        PropTypes.string.isRequired,
  inventory:          PropTypes.array.isRequired,
  angle:              PropTypes.number.isRequired,
};

class Asteroid extends React.Component {
  constructor(props) {
    super(props);
    this.ego = _.uniqueId('asteroid_');

    this.sizeInPx       = this.sizeInPx.bind(this);
    this.coordsToShip   = this.coordsToShip.bind(this);
    this.isTouchingShip = this.isTouchingShip.bind(this);

    this.state = {
      isTouchingShip: this.isTouchingShip(),
    };
  }

  componentDidMount() {
    messageBus.request('spacemap:add:rect', this.targetShape());
  }

  componentWillReceiveProps(nextProps) {
    const currentTouchStatus = this.isTouchingShip();
    if (this.state.isTouchingShip === currentTouchStatus) return;
    this.setState({ isTouchingShip: currentTouchStatus });
    if (currentTouchStatus) {
      messageBus.trigger('target:touched', this.targetInfo());
    } else {
      messageBus.trigger('target:untouched');
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.x === this.props.x && prevProps.y === this.props.y) return;
    messageBus.request('spacemap:add:rect', this.targetShape());
  }

  componentWillUnmount() {
    messageBus.request('spacemap:remove', this.targetShape());
  }

  sizeInPx() {
    const pixels = {
      meteoroid: 10,
      minor:     30,
      medium:    50,
      large:     100,
      planetoid: 500,
    };

    return pixels[this.props.size];
  }

  scaledCoords() {
    const { x: astX,  y: astY, tileSize } = this.props;
    const { x: tileX, y: tileY }          = this.props.tileScaledCoords;
    const relativeToTileX  = tileSize * (astX / 100);
    const relativeToTileY  = tileSize * (astY / 100);
    const asteroidCenterPx = this.sizeInPx() / 2

    return {
      x: tileX + relativeToTileX + asteroidCenterPx,
      y: tileY + relativeToTileY + asteroidCenterPx,
    };
  }

  coordsToShip() {
    const baseX    = this.props.tileRelativeCoords.x;
    const baseY    = this.props.tileRelativeCoords.y;
    const percentX = this.props.x / 100;
    const percentY = this.props.y / 100;
    const tileSize = this.props.tileSize;

    return {
      x: baseX + (percentX * tileSize) + (this.sizeInPx() / 2),
      y: baseY + (percentY * tileSize) + (this.sizeInPx() / 2),
    };
  }

  isTouchingShip() {
    const { x, y } = this.coordsToShip();
    const halfSize = this.sizeInPx() / 2;
    if (Math.abs(x) <= halfSize && Math.abs(y) <= halfSize) return true;
    return false;
  }

  targetInfo() {
    const name = `${this.props.size} asteroid`;
    const size = this.sizeInPx();
    const { description, inventory } = this.props;
    return { name, description, inventory, size };
  }

  targetShape() {
    const coords = this.scaledCoords();
    const size   = this.sizeInPx();
    return {
      ego:     this.ego,
      tileEgo: this.props.tileEgo,
      shape:   'rect',
      x:       coords.x,
      y:       coords.y,
      width:   size,
      height:  size,
    };
  }

  render() {
    const { x, y, size, description, inventory, angle, tileEgo } = this.props;
    const { isTouchingShip } = this.state;
    const dimensionPx    = this.sizeInPx();
    const modifierPx     = dimensionPx / 3;
    const infoBoxTitle   = `${size} asteroid`;
    const coordsForLabel = this.scaledCoords();

    const asteroidStyle = {
      position:        'absolute',
      bottom:          `${y}%`,
      left:            `${x}%`,
      width:           `${dimensionPx}px`,
      height:          `${dimensionPx}px`,
      color:           '#111',
      backgroundColor: isTouchingShip ? '#E6FFED' : 'gray',
      borderRadius:    `${modifierPx}px`,
      boxShadow:       `inset 0 0 ${modifierPx}px black`,
    };

    return (
      <div className="asteroid" style={asteroidStyle}>
        &nbsp;*•&nbsp;&nbsp;°&nbsp;O<br />
        •&nbsp;&nbsp;o&nbsp;&nbsp;*&nbsp;•<br />
        &nbsp;&nbsp;*&nbsp;•&nbsp;°
        <InfoBox
          visible={isTouchingShip}
          title={infoBoxTitle}
          description={description}
          inventory={inventory}
          angle={angle}
          objectSize={dimensionPx}
        />
        <CoordsLabel
          visible={appConfig.coordsLabels}
          ego={this.ego}
          tileEgo={tileEgo}
          x={coordsForLabel.x}
          y={coordsForLabel.y}
        />
      </div>
    );
  }
}

Asteroid.propTypes = propTypes;

export default Asteroid;
