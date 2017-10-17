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

    this.keyDownHandler        = this.keyDownHandler.bind(this);
    this.keyUpHandler          = this.keyUpHandler.bind(this);
    this.keyControlLoop        = this.keyControlLoop.bind(this);
    this.turnDegrees           = this.turnDegrees.bind(this);
    this.moveXY                = this.moveXY.bind(this);
    this.turnLeft              = this.turnLeft.bind(this);
    this.turnRight             = this.turnRight.bind(this);
    this.moveForward           = this.moveForward.bind(this);
    this.moveBackward          = this.moveBackward.bind(this);
    this.moveLeft              = this.moveLeft.bind(this);
    this.moveRight             = this.moveRight.bind(this);
    this.moveDiagForwardLeft   = this.moveDiagForwardLeft.bind(this);
    this.moveDiagForwardRight  = this.moveDiagForwardRight.bind(this);
    this.moveDiagBackwardLeft  = this.moveDiagBackwardLeft.bind(this);
    this.moveDiagBackwardRight = this.moveDiagBackwardRight.bind(this);

    this.loopMillis  = 100;
    this.pressedKeys = {};
    this.keyControls = {
      'ArrowLeft':  this.turnLeft,
      'ArrowRight': this.turnRight,
      'w':          this.moveForward,
      's':          this.moveBackward,
      'a':          this.moveLeft,
      'd':          this.moveRight,
    };

    this.state = {
      angle:   0,
      offsetX: 0,
      offsetY: 0,
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

  keyDownHandler(event) {
    this.pressedKeys[event.key] = true;
  }

  keyUpHandler(event) {
    this.pressedKeys[event.key] = false;
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
      offsetX: prevState.offsetX + (coords.x || 0),
      offsetY: prevState.offsetY + (coords.y || 0),
    }));
  }

  turnLeft() {
    this.turnDegrees(8);
  }

  turnRight() {
    this.turnDegrees(-8);
  }

  moveForward() {
    this.moveXY({
      x: 0,
      y: 10,
    });
  }

  moveBackward() {
    this.moveXY({
      x: 0,
      y: -10,
    });
  }

  moveLeft() {
    this.moveXY({
      x: -10,
      y: 0,
    });
  }

  moveRight() {
    this.moveXY({
      x: 10,
      y: 0,
    });
  }

  moveDiagForwardLeft() {
    const magnitude = Math.sqrt(50);
    this.moveXY({
      x: -1 * magnitude,
      y: magnitude,
    });
  }

  moveDiagForwardRight() {
    const magnitude = Math.sqrt(50);
    this.moveXY({
      x: magnitude,
      y: magnitude,
    });
  }

  moveDiagBackwardLeft() {
    const magnitude = Math.sqrt(50);
    this.moveXY({
      x: -1 * magnitude,
      y: -1 * magnitude,
    });
  }

  moveDiagBackwardRight() {
    const magnitude = Math.sqrt(50);
    this.moveXY({
      x: magnitude,
      y: -1 * magnitude,
    });
  }

  render() {
    return (
      <Space
        player={this.props.player}
        angle={this.state.angle}
        offsetX={this.state.offsetX}
        offsetY={this.state.offsetY}
        keyDownHandler={this.keyDownHandler}
        keyUpHandler={this.keyUpHandler}
      />
    );
  }
}

SpaceContainer.propTypes = propTypes;

export default SpaceContainer;
