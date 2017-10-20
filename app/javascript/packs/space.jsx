import React     from 'react';
import PropTypes from 'prop-types';
import MainShip  from './main_ship';
import SpaceTile from './space_tile';

import {
  coordsFromParams,
  coordString,
} from './helpers';

const propTypes = {
  player:          PropTypes.object.isRequired,
  angle:           PropTypes.number.isRequired,
  offsetX:         PropTypes.number.isRequired,
  offsetY:         PropTypes.number.isRequired,
  keyDownHandler:  PropTypes.func.isRequired,
  keyUpHandler:    PropTypes.func.isRequired,
  moveDirection:   PropTypes.string.isRequired,
};

class Space extends React.Component {
  constructor(props) {
    super(props);

    // defaults/pseudo-"constants"
    this.debug    = true;
    this.tileSize = 200;

    const startingTile = '0,0';
    this.state = {
      centerTile: startingTile,
      tiles:      this.tilesAdjacentTo(startingTile),
    };

    this.addTile         = this.addTile.bind(this);
    this.removeTile      = this.removeTile.bind(this);
    this.tilesAdjacentTo = this.tilesAdjacentTo.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const prevX = this.props.offsetX;
    const prevY = this.props.offsetY;
    const nextX = nextProps.offsetX;
    const nextY = nextProps.offsetY;
    if (prevX === nextX && prevY === nextY) return;

    const tileX = Math.floor((nextX + (this.tileSize / 2)) / this.tileSize);
    const tileY = Math.floor((nextY + (this.tileSize / 2)) / this.tileSize);
    const centerTile = coordString(tileX, tileY);
    if (this.state.centerTile === centerTile) return;

    this.setState({
      centerTile: coordString(tileX, tileY),
      tiles:      this.tilesAdjacentTo(tileX, tileY),
    });

  }

  componentDidUpdate() {
    if (!this.debug) return;
    console.log('========== CURRENT STATE ==========');
    _.each(this.state, (val, key) => console.log(`${key}: ${val}`));
  }

  tilesAdjacentTo(...coordinates) {
    const coords = coordsFromParams(coordinates);
    return [
      coordString(coords.x - 1, coords.y - 1),
      coordString(coords.x - 1, coords.y + 0),
      coordString(coords.x - 1, coords.y + 1),
      coordString(coords.x + 0, coords.y - 1),
      coordString(coords.x + 0, coords.y + 0),
      coordString(coords.x + 0, coords.y + 1),
      coordString(coords.x + 1, coords.y - 1),
      coordString(coords.x + 1, coords.y + 0),
      coordString(coords.x + 1, coords.y + 1),
    ]
  }

  addTile(...coordinates) {
    const coordStr = coordString(coordinates);
    this.setState((prevState) => {
      if (_.contains(prevState.tiles, coordStr)) return prevState;
      return { tiles: [...prevState.tiles, coordStr], }
    });
  }

  removeTile(...coordinates) {
    const coordStr = coordString(coordinates);
    this.setState((prevState) => {
      return { tiles: _.without(prevState.tiles, coordStr) };
    });
  }

  render() {
    const spaceStyle = {
      backgroundColor: 'blue',
      position:        'fixed',
      top:             "0px",
      bottom:          "0px",
      left:            "0px",
      right:           "0px",
    };

    const spaceTiles = _.map(this.state.tiles, (coordinates) => {
      const coords = coordsFromParams(coordinates);
      return (<SpaceTile
        key={coordString(coords)}
        size={this.tileSize}
        x={coords.x}
        y={coords.y}
        angle={this.props.angle}
        offsetX={this.props.offsetX}
        offsetY={this.props.offsetY}
      />)
    })

    return (
      <div
        id="space"
        tabIndex="0"
        style={spaceStyle}
        onKeyDown={this.props.keyDownHandler}
        onKeyUp={this.props.keyUpHandler}
      >
        {spaceTiles}
        <MainShip
          player={this.props.player}
          angle={this.props.angle}
          moveDirection={this.props.moveDirection}
        />
      </div>
    );
  }
}

Space.propTypes = propTypes;

export default Space;
