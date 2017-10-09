import React from 'react';

const spaceStyle = {
  color:           '#FFFFFF',
  backgroundColor: '#000000',
  width:           '400px',
  height:          '400px'
}

export default class Space extends React.Component {
  render() {
    return (
      <div style={spaceStyle}>hey what up from SPACE</div>
    )
  }
}