import React from 'react';

export default class Space extends React.Component {
  render() {
    const {
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
          transition:      'transform 0.25s ease-out'
        }}>
        <br/><br/><br/><br/><br/><br/><br/>
        <p>
          &nbsp;&nbsp;&nbsp;hey what up from SPACE
        </p>
        <p>
          &nbsp;&nbsp;&nbsp;(click me and use arrows to moooove)
        </p>
      </div>
    )
  }
}