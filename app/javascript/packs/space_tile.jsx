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

    this.state = {
      starMap: []
    };

    this.serialize   = this.serialize.bind(this);
    this.saveTile    = this.saveTile.bind(this);
    this.loadTile    = this.loadTile.bind(this);
    this.coordString = this.coordString.bind(this);
    this.populate    = this.populate.bind(this);
    this.trueCoords  = this.trueCoords.bind(this);
  }

  componentWillMount() {
    this.loadTile(tile => this.populate(tile));
  }

  componentWillUnmount() {
    this.saveTile();
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

  // you can pass a callback to saveTile() or chain the returned promise with
  // callbacks by employing saveTile().then() (or do both!)
  saveTile(callback = () => {}) {
    const jsonHeaders = {
      'Content-Type': 'application/json',
      'Accept':       'application/json',
    };

    return fetch(`/space_tiles/${this.coordString()}`, {
      method:  'put',
      headers: jsonHeaders,
      body:    this.serialize(),
    }).then(resp => resp.json())
      .then(tile => callback(tile));
  }

  // you can pass a callback to loadTile() or chain the returned promise with
  // callbacks by employing loadTile().then() (or do both!)
  loadTile(callback = () => {}) {
    return fetch(`/space_tiles/${this.coordString()}`)
      .then(resp => resp.json())
      .then(tile => callback(tile));
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
