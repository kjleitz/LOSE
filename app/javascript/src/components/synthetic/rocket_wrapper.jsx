import React     from 'react';
import PropTypes from 'prop-types';
import Rocket    from 'components/synthetic/rocket';

const propTypes = {
  player:    PropTypes.object,
  rockets:   PropTypes.array.isRequired,
  shipAngle: PropTypes.number.isRequired,
  shipX:     PropTypes.number.isRequired,
  shipY:     PropTypes.number.isRequired,
};

const RocketWrapper = props => (
  <div>
    {props.rockets.map((rocket, index) => (
      <Rocket
        key={index}
        player={props.player}
        launched={true}
        shipAngle={props.shipAngle}
        shipX={props.shipX}
        shipY={props.shipY}
      />
    ))}
  </div>
);

RocketWrapper.propTypes = propTypes;

export default RocketWrapper;
