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

    this.state = {
      tiles: [],
    };

    this.addTile    = this.addTile.bind(this);
    this.removeTile = this.removeTile.bind(this);
  }

  componentDidMount() {
    this.addTile(-1, -1);
    this.addTile(-1,  0);
    this.addTile(-1,  1);
    this.addTile( 0, -1);
    this.addTile( 0,  0);
    this.addTile( 0,  1);
    this.addTile( 1, -1);
    this.addTile( 1,  0);
    this.addTile( 1,  1);
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