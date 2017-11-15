import React     from 'react';
import PropTypes from 'prop-types';
import MainShip  from './main_ship';
import SpaceTile from './space_tile';

import {
  coordsFromParams,
  coordString,
} from './helpers';

const propTypes = {
  player:        PropTypes.object.isRequired,
  tileSize:      PropTypes.number.isRequired,
  angle:         PropTypes.number.isRequired,
  shipX:         PropTypes.number.isRequired,
  shipY:         PropTypes.number.isRequired,
  moveDirection: PropTypes.string.isRequired,
};

class Space extends React.Component {
  constructor(props) {
    super(props);

    this.debug = false;

    const startingTile  = '0,0';
    const adjacentTiles = this.tilesAdjacentTo(startingTile);
    this.state = {
      centerTile: startingTile,
      tiles:      adjacentTiles,
    };

    this.addTile         = this.addTile.bind(this);
    this.removeTile      = this.removeTile.bind(this);
    this.tilesAdjacentTo = this.tilesAdjacentTo.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const prevX = this.props.shipX;
    const prevY = this.props.shipY;
    const nextX = nextProps.shipX;
    const nextY = nextProps.shipY;
    if (prevX === nextX && prevY === nextY) return;

    const tileX = Math.floor(nextX / this.props.tileSize);
    const tileY = Math.floor(nextY / this.props.tileSize);
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
    ];
  }

  addTile(...coordinates) {
    const coordStr = coordString(coordinates);
    this.setState((prevState) => {
      if (_.contains(prevState.tiles, coordStr)) return prevState;
      return { tiles: [...prevState.tiles, coordStr] };
    });
  }

  removeTile(...coordinates) {
    const coordStr = coordString(coordinates);
    this.setState(prevState => ({ tiles: _.without(prevState.tiles, coordStr) }));
  }

  render() {
    const spaceStyle = {
      backgroundColor: 'black',
      position:        'fixed',
      top:             "0px",
      bottom:          "0px",
      left:            "0px",
      right:           "0px",
    };

    const spaceTiles = _.map(this.state.tiles, (coordStr) => {
      const coords = coordsFromParams(coordStr);
      return (<SpaceTile
        key={coordString(coords)}
        size={this.props.tileSize}
        tileX={coords.x}
        tileY={coords.y}
        angle={this.props.angle}
        shipX={this.props.shipX}
        shipY={this.props.shipY}
      />);
    });

    return (
      <div id="space" style={spaceStyle} >
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
