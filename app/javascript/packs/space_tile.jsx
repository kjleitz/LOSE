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
  size:    PropTypes.number.isRequired,
  tileX:   PropTypes.number.isRequired,
  tileY:   PropTypes.number.isRequired,
  angle:   PropTypes.number.isRequired,
  offsetX: PropTypes.number.isRequired,
  offsetY: PropTypes.number.isRequired,
};

class SpaceTile extends React.Component {
  constructor(props) {
    super(props);
    _.extendOwn(this, { save, load });

    this.debug  = false;
    this.coords = {
      tileX: props.tileX,
      tileY: props.tileY,
    };

    this.saveURL = `/space_tiles/${this.coordString()}`;
    this.loadURL = `/space_tiles/${this.coordString()}`;

    this.state = {
      starMap:   [],
      asteroids: [
        {
          id:   1,
          size: 'small',
          x:    40,
          y:    70,
        },
      ],
    };

    this.serialize    = this.serialize.bind(this);
    this.coordString  = this.coordString.bind(this);
    this.populate     = this.populate.bind(this);
    this.trueCoords   = this.trueCoords.bind(this);
    this.centerCoords = this.centerCoords.bind(this);
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
        // x:          this.coords.tileX,
        // y:          this.coords.tileY,
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

  coordString() {
    return coordString(this.coords);
  }

  trueCoords() {
    const  { size, offsetX, offsetY, tileX, tileY } = this.props;
    return {
      //  400  *   3    -    200     -   330   === 670 (tile is still 670px to the right)
      x: (size * tileX) - (size / 2) - offsetX,
      y: (size * tileY) - (size / 2) - offsetY,
    };
  }

  centerCoords() {
    const { x, y } = this.trueCoords();
    const { size } = this.props;

    return {
      x: x + (size / 2),
      y: y + (size / 2),
    }
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
      zIndex:             '-10',
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
            tileCenter={this.centerCoords()}
            size={ast.size}
            description={ast.description}
          />
        ))}
      </div>
    );
  }
}

SpaceTile.propTypes = propTypes;

export default SpaceTile;
