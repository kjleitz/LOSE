import React      from 'react';
import PropTypes  from 'prop-types';
import { Events } from 'backbone';
import appConfig  from 'application/app_config';
import Space      from 'components/natural/space';
import messageBus from 'radio/message_bus';

import {
  coordsFromParams,
} from 'helpers/helpers';

const propTypes = {
  player: PropTypes.object.isRequired,
};

class SpaceContainer extends React.Component {
  constructor(props) {
    super(props);
    _.extend(this, Events);

    // defaults/pseudo-"constants"
    this.loopMillis  = 25;
    this.degsPerTurn = 4;
    this.pxPerMove   = 5;
    this.tileSize    = 1000;

    this.wireControls   = this.wireControls.bind(this);
    this.moveDirection  = this.moveDirection.bind(this);
    this.keyControlLoop = this.keyControlLoop.bind(this);
    this.turnDegrees    = this.turnDegrees.bind(this);
    this.turnLeft       = this.turnLeft.bind(this);
    this.turnRight      = this.turnRight.bind(this);
    this.moveXY         = this.moveXY.bind(this);
    this.angledXY       = this.angledXY.bind(this);
    this.moveForward    = this.moveForward.bind(this);
    this.moveBackward   = this.moveBackward.bind(this);
    this.moveLeft       = this.moveLeft.bind(this);
    this.moveRight      = this.moveRight.bind(this);

    this.spaceMap    = [];
    this.pressedKeys = {};
    this.keyControls = {
      left:  this.turnLeft,
      right: this.turnRight,
      up:    this.moveForward,
      down:  this.moveBackward,
      a:     this.moveLeft,
      d:     this.moveRight,
    };

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
    this.wireControls(messageBus);
    this.wireSpaceMap(messageBus);
  }

  componentDidMount() {
    this.mainLoop = this.keyControlLoop();
  }

  componentDidUpdate() {
    if (!appConfig.logState) return;
    console.log('========== CURRENT STATE ==========');
    _.each(this.state, (val, key) => console.log(`${key}: ${val}`));
  }

  componentWillUnmount() {
    clearInterval(this.mainLoop);
  }

  wireControls(bus) {
    this.listenTo(bus, 'key:left:down',  () => { this.pressedKeys.left  = true;  });
    this.listenTo(bus, 'key:right:down', () => { this.pressedKeys.right = true;  });
    this.listenTo(bus, 'key:up:down',    () => { this.pressedKeys.up    = true;  });
    this.listenTo(bus, 'key:down:down',  () => { this.pressedKeys.down  = true;  });
    this.listenTo(bus, 'key:a:down',     () => { this.pressedKeys.a     = true;  });
    this.listenTo(bus, 'key:d:down',     () => { this.pressedKeys.d     = true;  });
    this.listenTo(bus, 'key:left:up',    () => { this.pressedKeys.left  = false; });
    this.listenTo(bus, 'key:right:up',   () => { this.pressedKeys.right = false; });
    this.listenTo(bus, 'key:up:up',      () => { this.pressedKeys.up    = false; });
    this.listenTo(bus, 'key:down:up',    () => { this.pressedKeys.down  = false; });
    this.listenTo(bus, 'key:a:up',       () => { this.pressedKeys.a     = false; });
    this.listenTo(bus, 'key:d:up',       () => { this.pressedKeys.d     = false; });
  }

  wireSpaceMap(bus) {
    bus.reply('spacemap:index', () => this.spaceMap);

    bus.reply('spacemap:add:rect', (target) => {
      // TODO: make these into 'spacemap:add' since shape isn't added here anymore
      if (!this.validateTargetRect(target)) throw new Error('Shape error: rect');
      this.spaceMap = _.reject(this.spaceMap, knownTarget => knownTarget.ego === target.ego);
      this.spaceMap.push(target);
    });

    bus.reply('spacemap:add:circle', (target) => {
      // targetShape should be { shape: 'circle', x:, y:, radius: }
      // TODO: make these into 'spacemap:add' since shape isn't added here anymore
      this.spaceMap.push(target);
    });

    bus.reply('spacemap:add:poly', (target) => {
      // TODO
      this.spaceMap.push(target);
    });

    bus.reply('spacemap:remove', (target) => {
      this.spaceMap = _.reject(this.spaceMap, knownTarget => knownTarget.ego === target.ego);
    });

    // for checking a point collision
    bus.reply('spacemap:at', (coordinates) => {
      const subject = coordsFromParams(coordinates);
      return _.find(this.spaceMap, (target) => {
        // need to extract these into general functions for detecting
        // collisions between two shapes
        if (target.shape === 'rect') {
          const targetX = target.x - (target.width  / 2);
          const targetY = target.y - (target.height / 2);
          return (
            subject.x <= targetX + target.width  &&
            subject.x >= targetX                 &&
            subject.y <= targetY + target.height &&
            subject.y >= targetY
          );
        } else if (target.shape === 'circle') {
          const dx = subject.x - target.x;
          const dy = subject.y - target.y;
          const distance = Math.sqrt(dx ** 2, dy ** 2);
          return distance <= radius;
        } else if (target.shape === 'poly') {
          // TODO
          return false;
        }
        return false;
      });
    });

    // for returning a target by its ego
    bus.reply('spacemap:find', ego => _.find(this.spaceMap, target => target.ego === ego));
  }

  validateTargetRect(target) {
    // tileEgo is optional since not everything's in a tile
    const properties = ['ego', 'shape', 'x', 'y', 'width', 'height'];
    return target.shape === 'rect' && _.has(target, ...properties);
  }

  moveDirection(pressedHash) {
    if (pressedHash.up)                     return 'forward';
    if (pressedHash.left  || pressedHash.a) return 'left';
    if (pressedHash.right || pressedHash.d) return 'right';
    return '';
  }

  keyControlLoop() {
    return setInterval(() => {
      // get currently-pressed keys
      const pressedHash = messageBus.request('keys:pressed:hash');
      // check current move direction for visual aid (e.g. engine exhaust)
      const moveDirection = this.moveDirection(pressedHash);
      // if the move direction is the same, don't update the state unnecessarily
      if (this.state.moveDirection !== moveDirection) this.setState({ moveDirection });
      // run through the pressed keys, firing off the methods they trigger
      _.each(pressedHash, (isPressed, key) => {
        const keyAction = this.keyControls[key];
        if (isPressed && _.isFunction(keyAction)) keyAction();
      });
    }, this.loopMillis);
  }

  turnDegrees(degrees) {
    this.setState(prevState => ({ angle: prevState.angle + degrees }));
  }

  turnLeft() {
    this.turnDegrees(this.degsPerTurn);
  }

  turnRight() {
    this.turnDegrees(-1 * this.degsPerTurn);
  }

  moveXY(...coordinates) {
    const coords = coordsFromParams(coordinates);
    this.setState(prevState => ({
      shipX: prevState.shipX + coords.x,
      shipY: prevState.shipY + coords.y,
    }));
  }

  angledXY() {
    const radians = this.state.angle * (Math.PI / 180);
    const angledX = this.pxPerMove * Math.sin(radians);
    const angledY = this.pxPerMove * Math.cos(radians);
    return { angledX, angledY };
  }

  moveForward() {
    const { angledX, angledY } = this.angledXY();
    this.moveXY({
      x: -1 * angledX,
      y: angledY,
    });
  }

  moveBackward() {
    const { angledX, angledY } = this.angledXY();
    this.moveXY({
      x: angledX,
      y: -1 * angledY,
    });
  }

  moveLeft() {
    const { angledX, angledY } = this.angledXY();
    this.moveXY({
      x: -1 * angledX,
      y: -1 * angledY,
    });
  }

  moveRight() {
    const { angledX, angledY } = this.angledXY();
    this.moveXY({
      x: angledX,
      y: angledY,
    });
  }

  render() {
    const { tileSize } = this;
    const { player   } = this.props;
    const { angle, shipX, shipY, moveDirection } = this.state;
    const spaceContainerStyle = {
      position:        'fixed',
      top:             '0px',
      right:           '0px',
      bottom:          '0px',
      left:            '0px',
      backgroundColor: 'black',
    };

    return (
      <div style={spaceContainerStyle} >
        <Space
          player={player}
          tileSize={tileSize}
          angle={angle}
          shipX={shipX}
          shipY={shipY}
          moveDirection={moveDirection}
        />
      </div>
    );
  }
}

SpaceContainer.propTypes = propTypes;

export default SpaceContainer;
