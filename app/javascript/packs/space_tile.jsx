import React     from 'react';
import PropTypes from 'prop-types';
import Star      from './star';

import {
  coordsFromParams,
  coordString,
} from './helpers';

const propTypes = {
  size:    PropTypes.number.isRequired,
  x:       PropTypes.number.isRequired,
  y:       PropTypes.number.isRequired,
  angle:   PropTypes.number.isRequired,
  offsetX: PropTypes.number.isRequired,
  offsetY: PropTypes.number.isRequired,
};

class SpaceTile extends React.Component {
  constructor(props) {
    super(props);

    this.coords = {
      x: props.x,
      y: props.y,
    };

    this.serialize   = this.serialize.bind(this);
    this.saveTile    = this.saveTile.bind(this);
    this.loadTile    = this.loadTile.bind(this);
    this.coordString = this.coordString.bind(this);
    this.trueCoords  = this.trueCoords.bind(this);
  }

  componentWillMount() {
    this.saveTile();
  }

  componentWillUnmount() {
    this.loadTile();
  }

  serialize() {
    JSON.stringify({
      space_tile: {
        x:           this.coords.x,
        y:           this.coords.y,
        true_coords: this.trueCoords(),
        // discoverer: this.props.player.username,
        // ...etc.
      }
    });
  }

  saveTile(callback = () => {}) {
    fetch(`space_tiles/${this.coordString()}`, {
      headers: { 'Content-Type': 'application/json' },
      method:  'post',
      body:    this.serialize(),
    }).then(resp => resp.json())
      .then(tile => callback(tile));
  }

  loadTile(callback = () => {}) {
    fetch(`space_tiles/${this.coordString()}`)
      .then(resp => resp.json())
      .then(tile => callback(tile));
  }

  coordString() {
    return coordString(this.coords);
  }

  trueCoords() {
    const size    = this.props.size;
    const tileX   = this.coords.x;
    const tileY   = this.coords.y;
    const offsetX = this.props.offsetX;
    const offsetY = this.props.offsetY;
    return {
      x: (size * tileX) - (size / 2) - offsetX,
      y: (size * tileY) - (size / 2) - offsetY,
    };
  }

  render() {
    const { x, y }        = this.trueCoords();
    const { size, angle } = this.props;
    const tileStyle       = {
      backgroundColor:    'black',
      border:             '1px solid gray',
      boxSizing:          'border-box',
      position:           'fixed',
      left:               `calc(50% + ${x}px)`,
      bottom:             `calc(50% + ${y}px)`,
      width:              `${size}px`,
      height:             `${size}px`,
      transform:          `rotate(${angle}deg)`,
      transformOrigin:    `${-1 * x}px ${y + size}px`,
    };

    return (
      <div className="space-tile" style={tileStyle}>
        <Star x={10} y={20} />
        <Star x={90} y={25} />
        <Star x={50} y={20} />
        <Star x={40} y={75} />
        <Star x={60} y={60} />
        <Star x={90} y={70} />
        <Star x={10} y={40} />
      </div>
    );
  }
}

SpaceTile.propTypes    = propTypes;

export default SpaceTile;
