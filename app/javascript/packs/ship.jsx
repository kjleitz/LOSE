import React     from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  player:        PropTypes.object,
  angle:         PropTypes.number,
  moveDirection: PropTypes.string,
  style:         PropTypes.object,
}

class Ship extends React.Component {
  render() {
    const { moveDirection, style } = this.props;
    let xFlame = "0px";
    let yFlame = "0px";
    if (moveDirection === "left")     xFlame = "10px";
    if (moveDirection === "right")    xFlame = "-10px";
    if (moveDirection === "forward")  yFlame = "15px";
    const flameStyle = moveDirection === '' ? {} : {
      boxShadow: `${xFlame} ${yFlame} 5px -3px orangered`
    }

    return (
      <div className="ship" style={style}>
        <div style={_.extend({
          width:     "100%",
          height:    "calc(100% - 15px)",
          marginTop: "15px",
        }, flameStyle)}></div>
      </div>
    )
  }
}

Ship.propTypes = propTypes;

export default Ship;
