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
  tileMap: PropTypes.object.isRequired,
};

const defaultProps = {
  size: 500,
};

class SpaceTile extends React.Component {
  constructor(props) {
    super(props);

    const existingTile = props.tileMap[this.coordString()];
    if (_.isObject(existingTile)) return existingTile;

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
    const scale   = this.props.size;
    const tileX   = this.coords.x;
    const tileY   = this.coords.y;
    const offsetX = this.props.offsetX;
    const offsetY = this.props.offsetY;
    return {
      x: (scale * tileX) - offsetX,
      y: (scale * tileY) - offsetY,
    };
  }

  tileStyle() {
    const  { x, y }        = this.trueCoords();
    const  { size, angle } = this.props;
    return {
      backgroundColor: 'black',
      border:          '1px solid gray',
      boxSizing:       'border-box',
      position:        'fixed',
      left:            `calc(33% + ${x}px)`,
      bottom:          `calc(10% + ${y}px)`,
      width:           `${size}px`,
      height:          `${size}px`,
      transform:       `rotate(${angle}deg)`,
      transition:      'transform 0.5s',
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
