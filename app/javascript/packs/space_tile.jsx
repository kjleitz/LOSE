import React     from 'react';
import PropTypes from 'prop-types';
import Star      from './star';
import Planet    from './planet';
import Asteroid  from './asteroid';

import {
  coordsFromParams,
  coordString,
  save,
  load,
} from './helpers';

const propTypes = {
  size:   PropTypes.number.isRequired,
  tileX:  PropTypes.number.isRequired,
  tileY:  PropTypes.number.isRequired,
  angle:  PropTypes.number.isRequired,
  shipX:  PropTypes.number.isRequired,
  shipY:  PropTypes.number.isRequired,
};

class SpaceTile extends React.Component {
  constructor(props) {
    super(props);
    _.extendOwn(this, { save, load });

    this.debug   = false;
    this.saveURL = `/space_tiles/${coordString(props.tileX, props.tileY)}`;
    this.loadURL = `/space_tiles/${coordString(props.tileX, props.tileY)}`;

    this.state = {
      starMap:   [],
      asteroids: [
        {
          id:          1,
          x:           40,
          y:           70,
          size:        'minor',
          description: "It's an ass steroid!",
          inventory:   [],
        },
      ],
    };

    this.serialize      = this.serialize.bind(this);
    this.populate       = this.populate.bind(this);
    this.scaledCoords   = this.scaledCoords.bind(this);
    this.relativeCoords = this.relativeCoords.bind(this);
  }

  componentDidMount() {
    this.load(tile => this.populate(tile));
  }

  componentWillUnmount() {
    this.save();
  }

  componentDidUpdate() {
    if (!this.debug) return;
    console.log('========== CURRENT STATE ==========');
    _.each(this.state, (val, key) => console.log(`${key}: ${val}`));
  }

  serialize() {
    return JSON.stringify({
      space_tile: {
        id: this.id,
        // x:          this.coords.x,
        // y:          this.coords.y,
        // discoverer: this.props.player.username,
        // planets:    blahblahblah,
        // asteroids:  blahblahblah,
        // wrecks:     blahblahblah,
        // ...etc.
      }
    });
  }

  populate(data) {
    this.id = data.space_tile.id;
    // add stars, planets, whatever
    this.setState({
      starMap:   data.space_tile.star_map,
      asteroids: data.space_tile.asteroids,
    });
  }

  // coordinates in space; a 100px tile at '-3,7' is { x: -300px, y: 700px }
  scaledCoords() {
    const  { size, tileX, tileY } = this.props;
    return {
      x: size * tileX,
      y: size * tileY,
    }
  }

  // coordinate distance to the bottom left corner of the tile w.r.t. the ship
  relativeCoords() {
    const  { x, y } = this.scaledCoords();
    const  { shipX, shipY } = this.props;
    return {
      x: x - shipX,
      y: y - shipY,
    }
  }

  render() {
    const { x, y }        = this.relativeCoords();
    const { size, angle } = this.props;
    const tileStyle       = {
      // border:          '1px solid gray',
      boxSizing:       'border-box',
      position:        'fixed',
      left:            `calc(50% + ${x}px)`,
      bottom:          `calc(50% + ${y}px)`,
      width:           `${size}px`,
      height:          `${size}px`,
      transform:       `rotate(${angle}deg)`,
      transformOrigin: `${-1 * x}px ${y + size}px`,
    };

    return (
      <div className="space-tile" style={tileStyle}>
        {_.map(this.state.starMap, (star, i) => (
          <Star
            key={i}
            x={star.x}
            y={star.y}
          />
        ))}
        {_.map(this.state.asteroids, ast => (
          <Asteroid 
            key={ast.id}
            x={ast.x}
            y={ast.y}
            tileRelativeCoords={this.relativeCoords()}
            tileSize={size}
            size={ast.size}
            description={ast.description}
            inventory={ast.inventory}
            angle={angle}
          />
        ))}
      </div>
    );
  }
}

SpaceTile.propTypes = propTypes;

export default SpaceTile;
