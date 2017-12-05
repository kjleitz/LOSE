import React     from 'react';
import PropTypes from 'prop-types';
import Rocket    from './rocket';

class RocketWrapper extends React.Component {
  constructor(props) {
    super(props)

  }

  render() {
    const rocketsArr = this.props.rockets.map((rocket, index) => {
      return (<Rocket
        key={index}
        className='uuuuhhhh'
        player={{ name: 'Mr. Game and Watch' }}
        launched={true}
        shipAngle={-1 * this.props.angle}
        shipX={this.props.shipX}
        shipY={this.props.shipY}
      />)
    })

    return (
      <div>
        {rocketsArr}
      </div>
    )
  }
}

export default RocketWrapper
