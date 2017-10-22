import React     from 'react';
import PropTypes from 'prop-types';
import Star      from './star';

import {
  coordsFromParams,
  coordString,
  save,
  load,
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
    _.extendOwn(this, { save, load });

    this.coords = {
      x: props.x,
      y: props.y,
    };

    this.saveURL = `/space_tiles/${this.coordString()}`;
    this.loadURL = `/space_tiles/${this.coordString()}`;

    this.state = {
      starMap: []
    };

    this.serialize   = this.serialize.bind(this);
    this.coordString = this.coordString.bind(this);
    this.populate    = this.populate.bind(this);
    this.trueCoords  = this.trueCoords.bind(this);
  }

  componentWillMount() {
    this.load(tile => this.populate(tile));
  }

  componentWillUnmount() {
    this.save();
  }

  serialize() {
    JSON.stringify({
      space_tile: {
        x:           this.coords.x,
        y:           this.coords.y,
        // discoverer: this.props.player.username,
        // planets:    blahblahblah,
        // asteroids:  blahblahblah,
        // wrecks:     blahblahblah,
        // ...etc.
      }
    });
  }

  populate(data) {
    // add stars, planets, whatever
    this.setState({ starMap: data.space_tile.star_map });
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
        {_.map(this.state.starMap, star => <Star x={star.x} y={star.y} />)}
      </div>
    );
  }
}

SpaceTile.propTypes    = propTypes;

export default SpaceTile;
