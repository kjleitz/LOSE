import React from 'react';

export default class Star extends React.Component {
  render() {
    return (
      <span
        style={{
          position: 'absolute',
          top:      `${this.props.y}%`,
          left:     `${this.props.x}%`,
          color:    '#BBB',
        }}
      >*</span>
    )
  }
}