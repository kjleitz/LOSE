import React     from 'react';
import PropTypes from 'prop-types';
import Rocket    from './rocket';

const propTypes = {
  player:    PropTypes.object,
  shipAngle: PropTypes.number.isRequired,
  shipX:     PropTypes.number.isRequired,
  shipY:     PropTypes.number.isRequired,
}

class RocketWrapper extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const rocketsArr = this.props.rockets.map((rocket, index) => {
      return (
        <Rocket
          key={index}
          player={this.props.player}
          launched={true}
          shipAngle={this.props.shipAngle}
          shipX={this.props.shipX}
          shipY={this.props.shipY}
        />)
    });

    return (
      <div>{rocketsArr}</div>
    );
  }
}

RocketWrapper.propTypes = propTypes;

export default RocketWrapper
