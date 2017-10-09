import React    from 'react';
import MainShip from './main_ship';
import Star     from './star';

export default class Space extends React.Component {
  render() {
    const {
      player,
      color,
      backgroundColor,
      width,
      height,
      angle,
      keyboardHandler
    } = this.props

    return (
      <div
        id="space"
        tabIndex="0"
        onKeyDown={keyboardHandler}
        style={{
          color:           color           || '#FFFFFF',
          backgroundColor: backgroundColor || '#000000',
          width:           width           || '400px',
          height:          height          || '400px',
          borderRadius:    '200px',
          margin:          '2em',
          outline:         'none',
          transform:       `rotate(${angle || 0}deg)`,
          transition:      'transform 0.5s ease-out'
        }}>
        <br/><br/><br/><br/><br/><br/><br/>
        <Star x={10} y={20} />
        <Star x={90} y={25} />
        <Star x={50} y={20} />
        <Star x={40} y={75} />
        <Star x={60} y={60} />
        <Star x={90} y={70} />
        <Star x={10} y={40} />
        <p>
          &nbsp;&nbsp;&nbsp;hey what up from SPACE
        </p>
        <p>
          &nbsp;&nbsp;&nbsp;(click me and use arrows to moooove)
        </p>
        <MainShip player={player} angle={angle} />
      </div>
    )
  }
}