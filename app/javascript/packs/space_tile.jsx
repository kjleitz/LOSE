import React     from 'react';
import PropTypes from 'prop-types';
import Star      from './star';

import {
  coordsFromParams,
  coordString,
} from './helpers';

const propTypes = {
  size:    PropTypes.number,
  x:       PropTypes.number.isRequired,
  y:       PropTypes.number.isRequired,
  angle:   PropTypes.number.isRequired,
  offsetX: PropTypes.number.isRequired,
  offsetY: PropTypes.number.isRequired,
  // tileMap: PropTypes.array.isRequired,
};

const defaultProps = {
  size: 500,
};

class SpaceTile extends React.Component {
  constructor(props) {
    super(props);

    // const existingTile = props.tileMap[this.coordString()];
    // if (_.isObject(existingTile)) return existingTile;

    this.coords = {
      x: props.x,
      y: props.y,
    };

    this.coordString = this.coordString.bind(this);
    this.trueCoords  = this.trueCoords.bind(this);
    this.tileStyle   = this.tileStyle.bind(this);
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

  tileStyle() {
    const  { x, y }        = this.trueCoords();
    const  { size, angle } = this.props;
    return {
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
  }

  render() {
    return (
      <div className="space-tile" style={this.tileStyle()}>
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
SpaceTile.defaultProps = defaultProps;

export default SpaceTile;
