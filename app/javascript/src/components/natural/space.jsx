import React         from 'react';
import PropTypes     from 'prop-types';
import appConfig     from 'application/app_config';
import MainShip      from 'components/synthetic/main_ship';
import SpaceTile     from 'components/natural/space_tile';
import RocketWrapper from 'components/synthetic/rocket_wrapper';

import {
  coordsFromParams,
  coordString,
} from 'helpers/helpers';

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

    const startingTile  = '0,0';
    const adjacentTiles = this.tilesAdjacentTo(startingTile);
    this.state = {
      centerTile:       startingTile,
      tiles:            adjacentTiles,
      availableRockets: [/* assuming this info would come from the db */],
      rocketsLaunched:  [/* right now unlimited but would be limited by availableRockets */],
    };

    this.addTile         = this.addTile.bind(this);
    this.removeTile      = this.removeTile.bind(this);
    this.tilesAdjacentTo = this.tilesAdjacentTo.bind(this);
    this.launchRocket    = this.launchRocket.bind(this);
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
    if (!appConfig.logState) return;
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

  launchRocket() {
    const { rocketsLaunched } = this.state;
    // in the future maybe this can contain a payload
    const newRocket = { name: `Supernova ${rocketsLaunched.length + 1}` };
    this.setState(prevState => ({
      rocketsLaunched: [...prevState.rocketsLaunched, newRocket],
    }));
  }

  render() {
    const spaceStyle = {
      position:        'relative',
      left:            `calc(50% - ${this.props.shipX}px)`,
      top:             `calc(50% + ${this.props.shipY}px)`,
      transform:       `rotate(${this.props.angle}deg)`,
      transformOrigin: `${this.props.shipX}px ${-1 * this.props.shipY}px`,
    };

    const spaceTiles = _.map(this.state.tiles, (coordStr) => {
      const coords = coordsFromParams(coordStr);
      return (
        <SpaceTile
          key={coordString(coords)}
          size={this.props.tileSize}
          tileX={coords.x}
          tileY={coords.y}
          angle={this.props.angle}
          shipX={this.props.shipX}
          shipY={this.props.shipY}
        />
      );
    });

    return (
      <div id="space" style={spaceStyle} >
        {spaceTiles}
        <MainShip
          player={this.props.player}
          angle={-1 * this.props.angle}
          moveDirection={this.props.moveDirection}
          shipX={this.props.shipX}
          shipY={this.props.shipY}
          launchRocket={this.launchRocket}
        />
        <RocketWrapper
          rockets={this.state.rocketsLaunched}
          player={this.props.player}
          shipAngle={-1 * this.props.angle}
          shipX={this.props.shipX}
          shipY={this.props.shipY}
        />
      </div>
    );
  }
}

Space.propTypes = propTypes;

export default Space;
