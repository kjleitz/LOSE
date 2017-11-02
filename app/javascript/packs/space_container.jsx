import React     from 'react';
import PropTypes from 'prop-types';
import Space     from './space';

import { coordsFromParams } from './helpers';

const propTypes = {
  player: PropTypes.object.isRequired,
};

class SpaceContainer extends React.Component {
  constructor(props) {
    super(props);

    this.keyDownHandler = this.keyDownHandler.bind(this);
    this.keyUpHandler   = this.keyUpHandler.bind(this);
    this.keyControlLoop = this.keyControlLoop.bind(this);
    this.turnDegrees    = this.turnDegrees.bind(this);
    this.moveXY         = this.moveXY.bind(this);
    this.turnLeft       = this.turnLeft.bind(this);
    this.turnRight      = this.turnRight.bind(this);
    this.moveForward    = this.moveForward.bind(this);
    this.moveBackward   = this.moveBackward.bind(this);
    this.moveLeft       = this.moveLeft.bind(this);
    this.moveRight      = this.moveRight.bind(this);

    // defaults/pseudo-"constants"
    this.debug       = false;
    this.loopMillis  = 25;
    this.degsPerTurn = 4;
    this.pxPerMove   = 5;
    this.tileSize    = 500;

    this.pressedKeys = {};
    this.keyControls = {
      'ArrowLeft':  this.turnLeft,
      'ArrowRight': this.turnRight,
      'ArrowUp':    this.moveForward,
      'ArrowDown':  this.moveBackward,
      'Control':    this.moveLeft,
      'Meta':       this.moveRight,
    };
    this.validKeys = _.keys(this.keyControls);

    this.state = {
      angle: 0,
      shipX: this.tileSize / 2,
      shipY: this.tileSize / 2,
      moveDirection: '',
    };

    // mainLoop stores the setInterval that checks keys being pressed/released
    // so that it can be initialized when the SpaceContainer mounts, and torn
    // down when the component is removed.
    this.mainLoop = null;
  }

  componentDidMount() {
    this.mainLoop = this.keyControlLoop();
  }

  componentWillUnmount() {
    clearInterval(this.mainLoop);
  }

  componentDidUpdate() {
    if (!this.debug) return;
    console.log('========== CURRENT STATE ==========');
    _.each(this.state, (val, key) => console.log(`${key}: ${val}`));
  }

  keyDownHandler(event) {
    const key = event.key;
    if (_.contains(this.validKeys, key)) this.pressedKeys[key] = true;
  }

  keyUpHandler(event) {
    const key = event.key;
    if (_.contains(this.validKeys, key)) this.pressedKeys[key] = false;
    this.setState({ moveDirection: '' });
  }

  keyControlLoop() {
    return setInterval(() => {
      _.each(this.pressedKeys, (isPressed, key) => {
        if (isPressed) this.keyControls[key]();
      })
    }, this.loopMillis)
  }

  turnDegrees(degrees) {
    this.setState(prevState => ({
      angle: prevState.angle + degrees,
    }));
  }

  moveXY(...coordinates) {
    const coords = coordsFromParams(coordinates);
    this.setState(prevState => ({
      shipX: prevState.shipX + coords.x,
      shipY: prevState.shipY + coords.y,
    }));
  }

  turnLeft() {
    this.setState({ moveDirection: "left" });
    this.turnDegrees(this.degsPerTurn);
  }

  turnRight() {
    this.setState({ moveDirection: "right" });
    this.turnDegrees(-1 * this.degsPerTurn);
  }

  moveForward() {
    const radians = this.state.angle * (Math.PI / 180);
    const angledX = this.pxPerMove * Math.sin(radians)
    const angledY = this.pxPerMove * Math.cos(radians)
    this.setState({ moveDirection: "forward" });
    this.moveXY({
      x: -1 * angledX,
      y: angledY,
    });
  }

  moveBackward() {
    const radians = this.state.angle * (Math.PI / 180);
    const angledX = this.pxPerMove * Math.sin(radians)
    const angledY = this.pxPerMove * Math.cos(radians)
    this.setState({ moveDirection: "backward" });
    this.moveXY({
      x: angledX,
      y: -1 * angledY,
    });
  }

  moveLeft() {
    const radians = this.state.angle * (Math.PI / 180);
    const angledX = (this.pxPerMove / 2) * Math.cos(radians)
    const angledY = (this.pxPerMove / 2) * Math.sin(radians)
    this.setState({ moveDirection: "left" });
    this.moveXY({
      x: -1 * angledX,
      y: -1 * angledY,
    });
  }

  moveRight() {
    const radians = this.state.angle * (Math.PI / 180);
    const angledX = (this.pxPerMove / 2) * Math.cos(radians)
    const angledY = (this.pxPerMove / 2) * Math.sin(radians)
    this.setState({ moveDirection: "right" });
    this.moveXY({
      x: angledX,
      y: angledY,
    });
  }

  render() {
    return (
      <Space
        player={this.props.player}
        tileSize={this.tileSize}
        angle={this.state.angle}
        shipX={this.state.shipX}
        shipY={this.state.shipY}
        keyDownHandler={this.keyDownHandler}
        keyUpHandler={this.keyUpHandler}
        moveDirection={this.state.moveDirection}
      />
    );
  }
}

SpaceContainer.propTypes = propTypes;

export default SpaceContainer;
