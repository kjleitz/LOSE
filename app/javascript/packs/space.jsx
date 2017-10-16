import React     from 'react';
import MainShip  from './main_ship';
import Star      from './star';
import SpaceTile from './space_tile'

import {
  coordsFromParams,
  coordString
} from './helpers';

const propTypes = {
  player:          PropTypes.object.isRequired
};

export default class Space extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tileMap:    {},
      angle:      0,
      offsetX:    0,
      offsetY:    0
    }

    this.tiles           = this.tiles.bind(this);
    this.addTile         = this.addTile.bind(this);
    this.tileAt          = this.tileAt.bind(this);
    this.keyboardHandler = this.keyboardHandler.bind(this);
    this.turnLeft        = this.turnLeft.bind(this);
    this.turnRight       = this.turnRight.bind(this);
    this.moveForward     = this.moveForward.bind(this);
    this.moveBackward    = this.moveBackward.bind(this);
    this.moveLeft        = this.moveLeft.bind(this);
    this.moveRight       = this.moveRight.bind(this);
  }

  tiles() {
    return _.values(this.state.tileMap);
  }

  addTile(...coordinates) {
    const coords = coordsFromParams(coordinates);
    this.setState((prevState) => {
      const tile = <SpaceTile
                     x={coords.x}
                     y={coords.y}
                     angle={this.state.angle}
                     offsetX={this.state.offsetX}
                     offsetY={this.state.offsetY}
                     tileMap={this.state.tileMap}
                     keyboardHandler={this.keyboardHandler} />;

      const newMap = _.extend(prevState.tileMap, {[tile.coordString]: tile});
      return {tileMap: newMap};
    })
  }

  removeTile(...coordinates) {
    this.setState((prevState) => {
      const newMap = _.omit(prevState.tileMap, coordString(coordinates));
      return {tileMap: newMap};
    })
  }

  tileAt(...coordinates) {
    return this.state.tileMap[coordString(coordinates)];
  }

  keyboardHandler(event) {
    switch(event.key) {
      case 'ArrowLeft':  this.turnLeft();
      case 'ArrowRight': this.turnRight();
      case 'w':          this.moveForward();
      case 's':          this.moveBackward();
      case 'a':          this.moveLeft();
      case 'd':          this.moveRight();
    }
  }

  turnDegrees(degrees) {
    this.setState(prevState => ({angle: prevState.angle + degrees}));
  }

  turnLeft() {
    this.turnDegrees(8);
  }

  turnRight() {
    this.turnDegrees(-8);
  }

  moveXY(...coordinates) {
    const coords = coordsFromParams(coordinates);
    this.setState(prevState => ({
      offsetX: prevState.offsetX + (coords.x || 0),
      offsetY: prevState.offsetY + (coords.y || 0)
    }));
  }

  moveForward() {
    this.moveXY({y: 10});
  }

  moveBackward() {
    this.moveXY({y: -10});
  }

  moveLeft() {
    this.moveXY({x: -10});
  }

  moveRight() {
    this.moveXY({x: 10});
  }

  moveDiagForwardLeft() {
    const magnitude = Math.sqrt(50);
    this.moveXY({x: -1 * magnitude, y: magnitude});
  }

  moveDiagForwardRight() {
    const magnitude = Math.sqrt(50);
    this.moveXY({x: magnitude, y: magnitude});
  }

  moveDiagBackwardLeft() {
    const magnitude = Math.sqrt(50);
    this.moveXY({x: -1 * magnitude, y: -1 * magnitude});
  }

  moveDiagBackwardRight() {
    const magnitude = Math.sqrt(50);
    this.moveXY({x: magnitude, y: -1 * magnitude});
  }

  render() {
    const {
      player
    } = this.props;

    return (
      <div 
        id="space"
        style={{
          backgroundColor: 'blue',
          position:        'fixed',
          top:             0,
          bottom:          0,
          left:            0,
          right:           0
        }}
      >
        {this.tiles()}
        <MainShip
          player={player}
          angle={this.state.angle}
          coords={this.state.shipCoords}
          keyboardHandler={this.keyboardHandler} />
      </div>
    )
  }
}

Space.propTypes = propTypes;

export default Space;


// export default class Space extends React.Component {
//   render() {
//     const {
//       player,
//       color,
//       backgroundColor,
//       width,
//       height,
//       angle,
//       keyboardHandler
//     } = this.props

//     return (
//       <div
//         id="space"
//         tabIndex="0"
//         onKeyDown={keyboardHandler}
//         style={{
//           color:           color           || '#FFFFFF',
//           backgroundColor: backgroundColor || '#000000',
//           width:           width           || '400px',
//           height:          height          || '400px',
//           borderRadius:    '200px',
//           margin:          '2em',
//           outline:         'none',
//           transform:       `rotate(${angle || 0}deg)`,
//           transition:      'transform 0.5s ease-out'
//         }}>
//         <br/><br/><br/><br/><br/><br/><br/>
//         <Star x={10} y={20} />
//         <Star x={90} y={25} />
//         <Star x={50} y={20} />
//         <Star x={40} y={75} />
//         <Star x={60} y={60} />
//         <Star x={90} y={70} />
//         <Star x={10} y={40} />
//         <p>
//           &nbsp;&nbsp;&nbsp;hey what up from SPACE
//         </p>
//         <p>
//           &nbsp;&nbsp;&nbsp;(click me and use arrows to moooove)
//         </p>
//         <MainShip player={player} angle={angle} />
//       </div>
//     )
//   }
// }